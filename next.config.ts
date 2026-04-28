import type { NextConfig } from "next";
import path from 'path';

const globalStyles = ['vars', 'funcs', 'mixins', 'media', 'colors'];

const nextConfig: NextConfig = {
  output: 'export', // Включаем статический экспорт

  poweredByHeader: false,
  reactStrictMode: false,

  // Отключаем лишние фичи для статики
  trailingSlash: true, // Добавляет / в конце URL для правильной работы на хостинге
  images: {
    unoptimized: true, // Отключаем оптимизацию изображений (для статики)
    formats: ['image/avif', 'image/webp'],
  },

  env: {
    APP_VERSION: process.env.npm_package_version,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: globalStyles
      ?.map(file => `@use "@/styles/global/${file}.scss" as *;`)
      .join('\n'),
  },

  // turbopack не работает для production build, только для dev
  // Убираем его или оставляем только для dev
  ...(process.env.NODE_ENV !== 'production' && {
    turbopack: {
      rules: {
        '*.md': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
      },
    },
  }),
};

export default nextConfig;