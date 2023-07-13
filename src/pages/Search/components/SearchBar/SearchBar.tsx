import React from 'react';

import styles from './SearchBar.module.css';

type SearchbarProps = {
  searchKeyword: string;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

const SearchBar = ({ searchKeyword, onEnter, onChange, onSearch }: SearchbarProps) => {
  return (
    <section className={styles.searchbarSection}>
      <h3 className={styles.searchbarTitle}>- find the best gif now - </h3>
      <div className={styles.searchbarContainer}>
        <input
          className={styles.searchInput}
          type="text"
          value={searchKeyword}
          onKeyPress={onEnter}
          onChange={onChange}
        />
        <button className={styles.searchButton} type="button" onClick={onSearch}>
          <div style={{ display: 'inline-block', width: 24, height: 24 }} />
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
