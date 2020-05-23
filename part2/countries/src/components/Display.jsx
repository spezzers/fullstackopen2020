import React from "react"


const Display = ({data, search, onClick}) => {

    const filteredData = data.filter(
        country => country.name.toUpperCase().includes(search.toUpperCase()))

    const searchResults = filteredData.map(
        country => {
            return (
                <div key={country.alpha3Code}>
                    {`${country.name}`}
                    <button value={country.name} onClick={onClick}>Show</button>
                </div>
            )
        }
    )

    if (search.length === 0) {
        return <div>Start a search to display countries</div>
    }
    
    else if(filteredData.length > 10) {
        return <div>Too many matches, please be more specific</div>
    }
    else if (filteredData.length === 1) {
        const country = filteredData[0]
        const lang = country.languages.map(language => {
            return (
                <li key={language.iso639_2}>{language.name}</li>
            )
        })
        console.log(lang)
        return (
            <div>
                <h1>{country.name}</h1>
                <div>capital: {country.capital}</div>
                <div>population: {country.population}</div>
                <h3>Languages</h3>
                <ul>{lang}</ul>
                <img src={country.flag} alt="flag" width="200px"/>
            </div>
        )
    }

    return (
        <div>
            {searchResults}
        </div>
    )
}

export default Display