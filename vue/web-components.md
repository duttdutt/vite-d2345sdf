<script setup>
import Alert from '../.vitepress/components/Alert.vue';
</script>

# Веб-компоненты

Набор Web API, позволяющий создавать переиспользуемые пользовательские HTML-элементы с инкапсулированными стилями и логикой.

## Пользовательские элементы (Custom Elements)

<Alert title="Имя пользовательского элемента должно содержать дефис">
<code>my-element</code> – валидно,<br><code>myelement</code> – нет.<br><br>
Это гарантирует отсутствие конфликтов имён между встроенными и пользовательскими элементами HTML.
</Alert>

### Автономные пользовательские элементы

- _Полностью новые элементы, расширяющие абстрактный класс `HTMLElement`._

<Alert title="Отсутствует семантика" type="warning">
Автономные пользовательские элементы не имеют семантики, так что они не известны поисковым системам и не помогают устройствам для людей с ограниченными возможностями не знают их.
</Alert>

::: details Создание

Чтобы создать пользовательский элемент, нужно сообщить браузеру ряд деталей о нём: как его показать, что делать, когда элемент добавляется или удаляется со страницы и т.д. Это делается путём создания класса со специальными методами и последующей регистрации:

```javascript
class MyElement extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Вызывается при добавлении элемента в документ.
   * Может вызываться многократно.
   */
  connectedCallback() {}

  /**
   * Вызывается при удалении элемента из документа.
   * Может вызываться многократно.
   */
  disconnectedCallback() {}

  /**
   * Массив имён атрибутов для отслеживания их изменений.
   */
  static get observedAttributes() {
    return ["attributeName"];
  }

  /**
   * Вызывается при изменении одного из перечисленных выше атрибутов.
   */
  attributeChangedCallback(name, oldValue, newValue) {}
}

// Регистрация
customElements.define("my-element", MyElement);

// Создание
document.createElement("my-element");
```

:::

### Пользовательские встроенные элементы

- _Элементы, расширяющие встроенные, например кнопку `HTMLButtonElement`._

::: details Создание

Чтобы создать пользовательский встроенный элемент, нужно:

1. Унаследоваться создаваемым классом от желаемого экземпляра класса элемента

   ```javascript
   class HelloButton extends HTMLButtonElement {}
   ```

2. Расшириться от `<button>` через поле `extends`:

   ```javascript
   customElements.define(
     "hello-button", // новое имя тега
     HelloButton, // класс
     {
       extends: "button", // от кого расширяется
     }
   );
   ```

3. Использовать с атрибутом `is`:

   ```javascript
   <button is="hello-button">...</button>
   ```

   :::

## Теневой DOM (Shadow DOM)

- _Набор API, инкапсулирующий и скрывающий логику элементов, прикрепляя теневое дерево DOM к элементу._<br><br>

- Отдельное дерево внутри основного DOM: недоступен через `querySelector` и имеет свои собственные стили.

  ![Теневой DOM в браузере](https://learn.javascript.ru/article/shadow-dom/shadow-dom-range@2x.png)

- `Shadow host` - узел, к которому прикрепляется теневое дерево.
- `Shadow root` — корневой узел/контейнер теневого дерева.

- Каждый элемент может иметь два вида поддеревьев DOM:
  - _Светлое дерево(Light Tree)_ — обычный DOM, состоящий из узлов.
  - _Теневое дерево(Shadow Tree)_ — DOM-поддерево, скрытое и не отображающееся в HTML-документе.
  - Если у элемента есть оба поддерева, то отрисуется только теневое поддерево.
- Теневое дерево можно использовать в пользовательских компонентах, чтобы инкапсулировать/спрятать внутренности(логику и стили) компонента:

  ```html
  <script>
    class extends HTMLElement {
      connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `<p>
          Hello, ${this.getAttribute("name")}
        </p>`;
      }
    }

    customElements.define("show-hello", HTMLElement);
  </script>

  <show-hello name="John"></show-hello>
  ```

::: details API {open}

```javascript
/**
 * Создает теневое дерево.
 *
 * @param mode Задает уровень инкапсуляции:
 * "open" — доступен через elem.shadowRoot
 * "closed" — elem.shadowRoot всегда возвращает null
*/
elem.attachShadow({ mode: ... });

/**
 * Получает теневой корень.
*/
elem.shadowRoot();
```

- `elem.attachShadow({ mode: ... })` — создает теневое дерево

<Alert title="Ограничения" type="warning">

— Для каждого элемента мы можем создать только один shadow root.<br><br>
— В качестве <code>elem</code> может быть использован пользовательский элемент, либо один из следующих элементов: <code>article</code>, <code>aside</code>, <code>blockquote</code>, <code>body</code>, <code>div</code>, <code>footer</code>, <code>h1...h6</code>, <code>header</code>, <code>main</code>, <code>nav</code>, <code>p</code>, <code>section</code> или <code>span</code>.<br>Остальные не могут содержать теневое дерево.

</Alert>

:::

## Ссылки

- [Веб-компоненты MDN](https://developer.mozilla.org/ru/docs/Web/API/Web_components)
- [Веб-компоненты Vue](https://ru.vuejs.org/guide/extras/web-components.html)
- [ ] Использование пользовательских элементов во Vue
- [ ] Создание пользовательских элементов с помощью Vue
- [ ] Non-Vue Web Components and TypeScript
- [ ] Веб-компоненты против Vue компонентов
- Shadow DOM
- [x] https://alishoff.com/blog/256
- [x] https://fruntend.com/posts/chto-takoe-shadow-dom
- [x] https://habr.com/ru/articles/180377/
- [x] https://thecode.media/shadow-dom-chto-eto-kak-s-nim-rabotat-i-chem-on-mozhet-byt-polezen-razrabotchiku/
- [ ] https://web.dev/articles/shadowdom-v1?hl=ru
- [ ] https://www.hellojavascript.info/docs/additional-questions/web-components/shadow-dom

```

```
