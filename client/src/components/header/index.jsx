"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div>
            <Link href="/">
              <img src="/images/logo.svg" alt="logo icon" />
            </Link>
            <Link href="/resumes" className="header-link">
              Мои резюме
            </Link>
            <a href="" className="header-link">
              Помощь
            </a>
          </div>
          <div>
            <button className="header-search">
              <img src="/images/search.svg" alt="search icon" />
              Поиск
            </button>
            <Link
              href="/create-resume"
              className="header-button header-button--green">
              Создать резюме
            </Link>
            <Link href="/login" className="header-button header-button--blue">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
