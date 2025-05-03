"use client";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div>
            <img src="/images/logo.svg" alt="logo icon" />
            <a href="">Работодателям</a>
            <a href="">Помощь</a>
          </div>
          <div>
            <button className="header-search">
              <img src="/images/search.svg" alt="search icon" />
              Поиск
            </button>
            <button className="header-button header-button--green">
              Создать резюме
            </button>
            <button className="header-button header-button--blue">Войти</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
