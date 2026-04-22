import React, { useEffect, useState, useRef, FC } from 'react';
import cls from './style.module.scss';
import { IMaskInput } from 'react-imask';

interface InputProps {
	title?: string | null;
	onValid?: (callback: (prev: Array<{ name: string; valid: boolean }>) => Array<{ name: string; valid: boolean }>) => void;
	name?: string | null;
	min?: number | null;
	max?: number | null;
	value?: string | number;
	type?: string;
	setter?: (value: number) => void;
	[key: string]: any;
}

export const Input: FC<InputProps> = ({
	title = null,
	onValid = () => { },
	name = null,
	min = null,
	max = null,
	value = '',
	type = 'text',
	setter = () => { },
	...props
}) => {
	const [validMessage, setValidMessage] = useState<string>('');
	const ref = useRef<any>(null);

	useEffect(() => {
		if (typeof onValid === 'function' && name) {
			onValid((prev: Array<{ name: string; valid: boolean }>) => {
				const findItem = prev.find(el => el.name === name);
				const valid = validMessage ? false : true;

				if (findItem) {
					findItem.valid = valid;
					return [...prev].map(el => el.name === name ? findItem : el);
				} else {
					return [...prev, { name, valid }];
				}
			});
		}
	}, [validMessage, onValid, name]);

	const inpOps = {
		value: String(value),
		type: 'text',
		onAccept: (value: string) => {
			const numeric = Number(String(value).replace(/\s/g, '').replace(',', '.'));
			setter(numeric);
		},
		unmask: true,
		ref,
		mask: Number,
		thousandsSeparator: " ",
		...props
	};

	useEffect(() => {
		if (type !== 'number') return;

		const validType = min && max ? 'minmax' : min && !max ? 'min' : !min && max ? 'max' : null;
		if (!validType) return;

		const messageObj: Record<string, string> = {
			min: `Значение должно быть больше ${min}`,
			max: `Значение должно быть не менее ${max}`,
			minmax: `Значение должно быть от ${min} до ${max}`
		};

		const funcObj: Record<string, () => boolean> = {
			min: () => Number(value) < min!,
			max: () => Number(value) > max!,
			minmax: () => Number(value) < min! || Number(value) > max!,
		};

		if (funcObj[validType]()) {
			setValidMessage(messageObj[validType]);
		} else {
			setValidMessage('');
		}
	}, [value, min, max, type]);

	return (
		<div className={cls.wrap}>
			{title && <p className={cls.title}>{title}</p>}
			<IMaskInput {...inpOps} className={cls.inp} />
			<p className={cls.valid} data-visible={validMessage ? true : false}>
				{validMessage}
			</p>
		</div>
	);
};

export default Input;