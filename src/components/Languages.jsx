import Select from "react-select";

const Languages = ({ lang, setLang }) => {
   
    const handleChange = (selectedOption) => {
        setLang(selectedOption.value); // Actualiza el idioma al valor seleccionado
        localStorage.setItem('lang', selectedOption.value);  // Guarda el idioma en sessionStorage
    };

    const options = [
        {
          value: "es",
          label: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://flagcdn.com/es.svg"
                alt="es"
                style={{ width: 20, marginRight: 8 }}
              />
              ES
            </div>
          ),
        },
        {
          value: "en",
          label: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://flagcdn.com/gb.svg"
                alt="en"
                style={{ width: 20, marginRight: 8 }}
              />
              EN
            </div>
          ),
        },
    ];

    return (
            <Select 
                    
                    options={options} 
                    value={options.find(opt => opt.value === lang)}  
                    onChange={handleChange} />
    )
}

export default Languages;
