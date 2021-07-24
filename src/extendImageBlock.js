const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, ToggleControl } = wp.components;
const { createHigherOrderComponent } = wp.compose;

addFilter(
    "blocks.registerBlockType",
    "bg-custom/add-works-text",
    addWorksText
);

addFilter(
    "editor.BlockEdit",
    "bg-custom/add-image-inspector-controls",
    addImageInspectorControls
)

addFilter(
    "blocks.getSaveContent.extraProps",
    "bg-custom/add-text-to-element-dataset",
    addTextToElementDataset
)

function addWorksText (settings, name) {
    if ("core/image" !== name) {
        return settings;
    };
    settings.attributes.lightbox = {
        type: 'boolean',
        default: false,
    }
    settings.attributes.workTitle = {
        type: 'string',
        default: '',
    }
    settings.attributes.workMedium = {
        type: 'string',
        default: '',
    }
    settings.attributes.workDimensions = {
        type: 'string',
        default: '',
    }
    settings.attributes.workDate = {
        type: 'string',
        default: '',
    }
    settings.attributes.workDescription = {
        type: 'string',
        default: '',
    }
    return settings;
}

function addImageInspectorControls( BlockEdit ) {
    const withInspectorControls = createHigherOrderComponent( BlockEdit => {
        return props => {
            if ( "core/image" !== props.name ) return <BlockEdit {...props}/>
            return <Fragment>
                <div>
                    <BlockEdit {...props} />
                </div>
                <InspectorControls>
                    <PanelBody title={__("Lightbox Settings", "bg-custom")}>
                        <ToggleControl 
                            label={__("Lightbox Enabled", "bg-custom")}
                            checked={props.attributes.lightbox}
                            onChange={lightbox => props.setAttributes({ lightbox })} />
                        <TextControl
                            label={__("Work Title", "bg-custom" )}
                            value={props.attributes.workTitle}
                            onChange={workTitle => props.setAttributes({ workTitle })} />
                        <TextControl
                            label={__("Work Medium", "bg-custom" )}
                            value={props.attributes.workMedium}
                            onChange={workMedium => props.setAttributes({ workMedium })} />
                        <TextControl
                            label={__("Work Dimensions", "bg-custom" )}
                            value={props.attributes.workDimensions}
                            onChange={workDimensions => props.setAttributes({ workDimensions })} />
                        <TextControl
                            label={__("Work Date", "bg-custom" )}
                            value={props.attributes.workDate}
                            onChange={workDate => props.setAttributes({ workDate })} />
                        <TextControl
                            label={__("Work Description", "bg-custom" )}
                            value={props.attributes.workDescription}
                            onChange={workDescription => props.setAttributes({ workDescription })} />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        };
    });
    return withInspectorControls(BlockEdit)
}

function addTextToElementDataset( props, type, attributes ) {
    if ("core/image" !== type.name) return props;
    if (attributes.lightbox) {
        props["data-lightbox-enabled"] = attributes.lightbox;
        props["data-work-title"] = attributes.workTitle;
        props["data-work-medium"] = attributes.workMedium;
        props["data-work-dimensions"] = attributes.workDimensions;
        props["data-work-date"] = attributes.workDate;
        props["data-work-description"] = attributes.workDescription;
    }
    return props
}