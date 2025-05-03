import "./globals.css";

export const metadata = {
  title:
    "Работа в Казахстане, поиск персонала и публикация вакансий - astana.hh.kz",
  description:
    "Официальный сайт — Найди работу мечты. Огромный выбор вакансий от прямых работодателей! Простая и понятная форма заполнения резюме. Бесплатная регистрация. Автообновление резюме. Мгновенные уведомления. Карьерный консультант.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
