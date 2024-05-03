export function save(key, value){
    localStorage.setItem(
        key,
        JSON.stringify(value)
    )
    return true;
}

export function load(key){
    if (!localStorage.getItem(key)) return null
    if (localStorage.getItem(key) == 'undefined') return null
    return JSON.parse(
        localStorage.getItem(key)
    )
}

export function remove(key){
    localStorage.removeItem(key)
}