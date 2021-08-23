import React from 'react';

const SearchForm = ({ value, onChange, onSubmit, onReset }) => {
  
  const handleChange = event => {
    onChange(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit();
  }

  const handleReset = () => {
    onReset();
  }

    return (  
      <form
      onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          autoFocus
          value={value}
          onChange={handleChange}
        />
        {value.length > 0 && (
          <button type="reset" className="btn-reset" onClick={handleReset}></button>
        )}
      </form>
    );
  };

  export default SearchForm;