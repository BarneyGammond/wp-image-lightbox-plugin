console.log('here we go')

const { addFilter } = wp.hooks;

addFilter(
    "blocks.getSaveElement",
    "gallery-lightbox/add-data-attr",
    lbAddAttributes
)

function lbAddAttributes(element, blockType, attributes) {
    if (blockType.name === 'core/gallery') {
        console.log(element);
        console.log(blockType);
        console.log(attributes);
    };
    return element;
}