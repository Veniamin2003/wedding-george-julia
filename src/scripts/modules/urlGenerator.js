export const urlGenerator = (obj = {}, mode = 'set', dispatchE = false) => {
    try {
        let params = new URLSearchParams(document.location.search),
            paramsString = "";

        // Отдаем все параметры из урла
        if(mode == 'getAll') return Object.fromEntries(params.entries());
        // Если передан пустой объект, то завершаем работу
        if(obj.length == 0) return false;

        // Проходимся по элементам объекта
        for (const name in obj) {
            if (Object.hasOwnProperty.call(obj, name)) {
                const value = obj[name];

                switch (mode) {
                    // добавляем параметр, без перезаписи. Т.е с этим режимом можем установить несколько параметров с одинаковыми ключами
                    case 'add':
                        let notFindFlag = true;
                        
                        try {
                            params.getAll(name).forEach(function(item) {
                                if(item == value) notFindFlag = false;
                            });
                        } catch (error) {
                            console.error(error);
                        }
        
                        if(notFindFlag) params.append(name, value);
                        break;
                    // Удаляем параметр с указанным ключем
                    case 'remove':
                        params.delete(name);
                        break;
                    // Устанавливаем параметр, с перезаписью. В этом режиме не может быть дубликатов ключей
                    case 'set':
                        params.set(name, value);
                        break;
                }
            }
        }

        // Получаем строку с параметрами для вставки в адресную строку и подготавливаем
        paramsString = params.toString();
        paramsString = paramsString ? "?" + paramsString : '';
        
        // Вставляем параметры в УРЛ
        history.pushState(null, null, document.location.pathname + paramsString);

        // Запускаем событие обновления урла
        if(dispatchE) {
            let event = new Event("changedFilterParamsInUrl", {bubbles: true});
            document.dispatchEvent(event);
        }
    } catch (error) {
        console.log(error)
    }

}