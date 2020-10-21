import "./button.scss";

function button({ text, size = "medium", color = "primary", type, classCustom, dataId }) {
  const sizeClassName = `btn--${size}`;
  const colorClassName = `btn--${color}`;
  if(type) 
    return `
      <button type="${type}" class="btn ${sizeClassName} ${colorClassName} ${classCustom}">${text}</button>
    `;
  else 
    return `
      <button data-id="${dataId}" class="btn ${sizeClassName} ${colorClassName} ${classCustom}">${text}</button>
    `;
}

export default button;
