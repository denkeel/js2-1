class Burger {
    constructor(sizeName, toppingName, addonsName) {
        let sizeEl = document.querySelector(`input[name=${sizeName}]:checked`);
        let toppingEl = document.querySelector(`input[name=${toppingName}]:checked`);
        //Преобразуем в массив потому что с NodeList'ом лучше не работать
        let addonsElems = [...document.querySelectorAll(`input[name=${addonsName}]:checked`)]; 
        /**
         * 
         * Решил оставить то что вверху в конструкторе, не знаю насколько это правильно?
         * 
         */

        this.size = new Parameter(sizeEl);
        this.topping = new Parameter(toppingEl);

        this.addons = [];
        addonsElems.forEach(addonEl => this.addons.push(new Parameter(addonEl)));
    }

    summurize(moneyTextId, caloriesTextId) {
        document.getElementById(moneyTextId).textContent = `Итого: ${this._sumPrice()} руб.`;
        document.getElementById(caloriesTextId).textContent = `Калорийность - ${this._sumCalories()} ккал.`;
    }
    
    _sumCalories() {
        let result = this.size.calories + this.topping.calories;
        for (let addon of this.addons) {
            result += addon.calories;
        }

        return result;
    }

    _sumPrice() {
        let result = this.size.price + this.topping.price;
        for (let addon of this.addons) {
            result += addon.price;
        }

        return result;
    }
}

class Parameter {
    constructor(elem) {
        this.price = +elem.dataset.price;
        this.calories = +elem.dataset.calories;
        this.name = elem.name;
    }
}