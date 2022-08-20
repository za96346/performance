export default class session{
    static data = null;

    static getItem(key) {
        try{
            this.data = JSON.parse(window.sessionStorage.getItem(key));
        } catch {
            this.data = window.sessionStorage.getItem(key);
        }
        return this.data;
    }

    static setItem(key, value) {
        if (typeof value === 'object') {
            this.data = window.sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            this.data = window.sessionStorage.setItem(key, value);
        }

        return this.data;
    }

    static clear() {
        window.sessionStorage.clear()
    }

}