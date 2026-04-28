'use client'

import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import Select, { StylesConfig, GroupBase } from 'react-select';
import { customSelectStyles } from '@/scripts';
import cls from './style.module.scss';
import { Input } from '@/components/ui';
import rawData from '&/data/products_full.json';

// Тип для опции товара
interface ProductOption {
  value: number;
  label: string;
}

// Тип для группы опций из JSON
interface JsonGroup {
  label: string;
  options: Array<{
    label: string;
    value: number;
  }>;
}

// Тип для специальной опции "Другой товар"
interface ManualOption {
  value: null;
  label: string;
}

// Объединенный тип для опций
type OptionType = ProductOption | ManualOption;

// Тип для группы опций для React Select
interface GroupedOption {
  label: string;
  options: OptionType[];
}

// Тип для валидации
interface ValidationItem {
  name: string;
  valid: boolean;
}

// Кастомный тип для стилей
type CustomStyles = StylesConfig<OptionType, false, GroupBase<OptionType>>;

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [paymentType, setPaymentType] = useState<string>("nal");
  const [productName, setProductName] = useState<string | null>(null);
  const [payment, setPayment] = useState<number | null>(0); // Изменено: начальное значение 0
  const [time, setTime] = useState<number>(6);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showPriceField, setShowPriceField] = useState<boolean>(false);

  const [monthlyPrice, setMonthlyPrice] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<string>('');
  const [overPrice, setOverPrice] = useState<string>('');

  const [valid, setValid] = useState<ValidationItem[]>([]);

  const manualOption: ManualOption = { label: 'Другой товар', value: null };
  const manualOptionGroup: GroupedOption = {
    label: '—',
    options: [manualOption]
  };

  const fullOptions: GroupedOption[] = [
    ...(rawData as JsonGroup[])
      .map(group => ({
        label: group.label,
        options: group.options
          .filter((item: any) => item.count !== 0) // Фильтруем товары с count = 0
          .map((item: any) => ({
            value: item.value,
            label: `${item.label} — ${item.count} шт.`
          }))
      }))
      .filter(group => group.options.length > 0), // Удаляем группы, в которых не осталось товаров
    manualOptionGroup
  ];

  const firstPaymentRate: number = 0; // Изменено: процент первоначального взноса 0%

  const sendReq = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (productName === "Другой товар" && !price) {
      return alert('Введите стоимость товара');
    }

    if (!price || payment === null || !productName || !time || valid.find(el => el.valid == false))
      return alert('Все поля должны быть заполнены корректно');

    const message = `Ас саламу алайкум! Хочу оформить рассрочку:

      • Товар: ${productName}
      • Первый взнос: ${Number(payment).toLocaleString('ru-RU') + ' ₽'} 
      • Срок: ${time} мес.
      • Способ оплаты: ${paymentType == 'nal' ? "Наличный" : "Безналичный"}
      • Платёж в месяц: ${monthlyPrice} 
      • Общая стоимость: ${totalPrice}`;

    const link = document.createElement('a');
    link.href = `https://wa.me/79627721490?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.click();
  };

  const selectChange = (e: OptionType | null) => {
    if (!e) return;

    if (e.value === null) {
      setSelectedOption(manualOption);
      setProductName(manualOption.label);
      setShowPriceField(true);
      setPrice(null);
      setPayment(0); // Сбрасываем первоначальный взнос в 0
      return;
    }

    setPrice(e.value);
    setPayment(0); // При выборе товара первоначальный взнос = 0
    setProductName(e.label);
    setSelectedOption(e);
    setShowInfo(true);
    setShowPriceField(false);
  };

  const isOptionSelected = (option: OptionType): boolean => {
    return selectedOption ? selectedOption.label === option.label : false;
  };

  useEffect(() => {
    if (
      price !== null && (
        !selectedOption ||
        (selectedOption.value !== null && price !== selectedOption.value)
      )
    ) {
      setSelectedOption(manualOption);
      setProductName(manualOption.label);
      setShowInfo(true);
      setShowPriceField(true);
      setPayment(0);
    }

    if (price) {
      const newMin = 0; // Минимальный взнос - 0
      const newMax = Math.ceil(price / 1000) * 1000;

      if (payment === null || payment < newMin || payment > newMax) {
        setPayment(0);
      }
    }
  }, [price]);

  useEffect(() => {
    if (
      selectedOption?.value === null &&
      price !== null &&
      payment === null
    ) {
      setPayment(0);
      setShowInfo(true);
    }
  }, [price, selectedOption, paymentType]);

  useEffect(() => {
    const priceNum = price || 0;
    const paymentNum = payment || 0;

    let paymentTypeRate = paymentType == "beznal" ? 1.10 : 1;
    let rate = 0.04;
    let credit = priceNum - paymentNum;
    let overCredit = Math.round(credit * (1 + rate * time) / 100 * paymentTypeRate) * 100;
    let monthlyPayment = Math.round(overCredit / time / 10) * 10;

    setMonthlyPrice(monthlyPayment.toLocaleString('ru-RU') + ' ₽');
    setTotalPrice(Math.round(monthlyPayment * time + paymentNum).toLocaleString('ru-RU') + ' ₽');
    setOverPrice(Math.round(paymentNum).toLocaleString('ru-RU') + ' ₽');
  }, [time, payment, price, paymentType]);

  const handlePaymentType = (e: ChangeEvent<HTMLInputElement>) => {
    let _value = e.target.value;
    setPaymentType(_value);
  };

  const rangePaymentOps = {
    step: 1000,
    name: 'downPayment',
    max: Math.ceil((price || 0) / 1000) * 1000,
    min: 0, // Минимум 0
    value: payment || 0,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      let step = 1000;
      let value = Number(e.target.value);
      const maxVal = price || 0;
      const minVal = 0;

      if ((value - maxVal < step) && (value - maxVal > 0)) {
        setPayment(maxVal);
      } else if ((value - minVal < step) && ((value - minVal < 0) || (value - minVal < step))) {
        setPayment(minVal);
      } else {
        setPayment(value);
      }
    }
  };

  const rangeMonthOps = {
    step: 1,
    name: 'monthCount',
    min: 3,
    max: 12,
    value: time,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setTime(Number(e.target.value))
  };

  return (
    <main className={cls.wrap}>
      <div className='form-block'>
        <form className="form" onSubmit={sendReq}>
          <h1>Калькулятор рассрочки</h1>
          <Select
            onChange={selectChange}
            styles={customSelectStyles as CustomStyles}
            options={fullOptions}
            value={selectedOption}
            isSearchable={true}
            placeholder="— Выберите —"
          />

          {showPriceField && (
            <Input
              name='price'
              onValid={setValid}
              title="Стоимость товара (₽)"
              value={typeof price === 'number' ? price : ''}
              type='number'
              setter={setPrice}
            />
          )}

          <Input
            name='payment'
            onValid={setValid}
            title="Первоначальный взнос (₽)"
            min={0} // Минимум 0
            max={price || 0}
            type='number'
            value={payment !== null ? payment : 0}
            setter={setPayment}
          />
          <input type="range" {...rangePaymentOps} />

          <Input
            name='months'
            onValid={setValid}
            title="Срок рассрочки (мес.)"
            min={1} // Изменено: минимум 1 месяц
            max={12}
            placeholder=''
            type='number'
            value={time}
            setter={setTime}
          />
          <input type="range" {...rangeMonthOps} />

          <div className="payment-section">
            <div className="payment-label">Способ оплаты</div>
            <div className='paymentType'>
              <input
                name="paymentType"
                type="radio"
                id="nal"
                onChange={handlePaymentType}
                value={"nal"}
                defaultChecked={paymentType == "nal"}
              />
              <input
                name="paymentType"
                type="radio"
                id="beznal"
                onChange={handlePaymentType}
                value={"beznal"}
                defaultChecked={paymentType == "beznal"}
              />
              <label htmlFor="nal">
                <span>Наличный</span>
              </label>
              <label htmlFor="beznal">
                <span>Безналичный</span>
              </label>
              <div className="slider-track"></div>
            </div>
          </div>

          <div className={`final-info ${showInfo ? 'visible' : 'hidden'}`}>
            <p>Первоначальный взнос: <span>{overPrice}</span></p>
            <p>Срок рассрочки: <span>{time + ' мес'}</span></p>
            <p>Ежемесячный платеж: <span>{monthlyPrice}</span></p>
            <p>Общая стоимость: <span>{totalPrice}</span></p>
          </div>

          <button type='submit' className='btn'>
            Оставить заявку
            <img src="images/WhatsApp.svg" alt="WhatsApp" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Home;