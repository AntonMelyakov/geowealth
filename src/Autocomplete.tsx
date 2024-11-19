import React, { useEffect, useState } from 'react';
import LastTen from './LastTen.tsx';

type state = {
    name: string,
    abbreviation: string
}

type user = {
 login: string,
 id: number,
}
 
const numOfResults = 10

export default function Autocomplete({id, httpReq}: {id:string, httpReq: boolean}) {
    const [searchedItem, setsearchedItem] = useState<string>('')
    const [states, setStates] = useState<state[]>([])
    const [filteredItems, setfilteredItems] = useState<state[]|user[]>([])
    const [lastTen, setLastTen] = useState<string[]>([])

    useEffect(() => {
        if(!httpReq) {
            fetch("./us-states.json").then(r => r.json()).then(data => {
                setStates(data)
            });
        }
        
        const storedLastTen = localStorage.getItem(id);
        if(storedLastTen) {
            setLastTen( JSON.parse(storedLastTen))
        }
    }, [])

    function filterStates(search: string) {
        setsearchedItem(search)
        if(search.length > 2) {
            const results = states.filter((state) => {
                return state.name.toLowerCase().includes(search.toLowerCase());
              });
              setfilteredItems(results.slice(0, numOfResults))
        }else {
            setfilteredItems([])
        }      
    }

    function addToLastTen (stateName: string) {
        if (lastTen.indexOf(stateName) == -1) {
            let newLastTenArray = [...lastTen, stateName]
            if(newLastTenArray.length > 10) {
                newLastTenArray.shift()
            }
            setLastTen(newLastTenArray)
            localStorage.setItem(id, JSON.stringify(newLastTenArray));
        }
    }

    function choseState(state: state) {
        setsearchedItem(state.name)
        setfilteredItems([])
        addToLastTen(state.name)
        console.log('selected state:', state.abbreviation);
    }

    function choseUser(user: user) {
        setsearchedItem(user.login)
        setfilteredItems([])
        addToLastTen(user.login)
        console.log('selected user:', user.id);
    }

    function userSearch(user: string) {
        setsearchedItem(user)
        if(user.length > 2) {
            fetch(`https://api.github.com/search/users?q=${user}&per_page=${numOfResults}`)
            .then(r => r.json())
            .then((data) => {
                if(data.items) {
                    setfilteredItems(data.items)
                } else {
                    setfilteredItems([])
                }       
            })
        }else {
            setfilteredItems([])
        }
    }

    function listFocus(e) {
        if(e.code == "ArrowDown") {
            e.preventDefault()
            const dropdown = document.getElementById('dropdown');
            if(dropdown) {
                const firstLi = dropdown.getElementsByTagName("li")[0];
                if(firstLi) {
                    firstLi.focus()
                }
            }  
        }    
    }

    function itemFocus(e, item) {
        e.preventDefault()
        if(e.code == "ArrowDown") {
            const next = e.target.nextSibling
            if(next) {
              next.focus()
            } 
        }else if(e.code == "ArrowUp") {
           const prev = e.target.previousSibling
            if(prev) {
              prev.focus()
            }
        } else if(e.code == "Enter") {
                httpReq ? choseUser(item) : choseState(item)
        }
    }

    return (
        <div className='autocomplete'>
            <input onKeyDown={(e) => listFocus(e)} value={searchedItem} type='search' onChange={(e) => {return httpReq ? 
                userSearch(e.target.value): 
                filterStates(e.target.value)}}/>

            {filteredItems.length > 0 && <ul id='dropdown' className='results'>
                {filteredItems.map(item => { 
                    return httpReq? 
                    <li tabIndex={-1} className='user item-li result' onKeyDown={(e) => itemFocus(e, item)} onClick={() => choseUser(item)} key={item.id}>{item.login}</li> :
                    <li tabIndex={-1} className='state item-li result' onKeyDown={(e) => itemFocus(e, item)} onClick={() => choseState(item)} key={item.abbreviation}>{item.name} </li>
                })}
                </ul>}

              
            {lastTen.length > 0 && <LastTen lastTen={lastTen} />} 

        </div>
    )
}

