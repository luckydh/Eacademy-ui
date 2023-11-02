let ls = window.localStorage;

let storage = {
    set: (name, value) => {
        ls.setItem(name, value)
    },
    get: (name) => {
        return ls.getItem(name)
    },
    delete: (name) => {
        ls.removeItem(name)
    },
    clear: () => {
        ls.clear()
    }
};

export default storage
