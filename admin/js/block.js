(function (blocks, editor, components, i18n, element) {
  var el = wp.element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var BlockControls = wp.editor.BlockControls;
  var AlignmentToolbar = wp.editor.AlignmentToolbar;
  var MediaUpload = wp.editor.MediaUpload;
  var InspectorControls = wp.editor.InspectorControls;
  var TextControl = components.TextControl;

  registerBlockType("marcosrego-web/flipbook-block", {
    title: i18n.__("FlipBook"),
    description: i18n.__(
      "Shows a PDF from your Media in a Flip Book, for your visitors to turn the pages."
    ),
    icon: "book",
    keywords: [
      i18n.__("pdf"),
      i18n.__("viewer"),
      i18n.__("reader"),
      i18n.__("flip"),
      i18n.__("pages"),
      i18n.__("turn"),
      i18n.__("flipbook"),
      i18n.__("book"),
    ],
    category: "media",
    attributes: {
      mediaID: {
        type: "number",
      },
      mediaURL: {
        type: "string",
      },
      mediaWidth: {
        type: "string",
      },
      mediaHeight: {
        type: "string",
      },
      alignment: {
        type: "string",
        default: "center",
      },
    },

    edit: function (props) {
      var attributes = props.attributes;
      var mediaWidth = props.attributes.mediaWidth;
      var mediaHeight = props.attributes.mediaHeight;
      var alignment = props.attributes.alignment;

      var onSelectPDF = function (media) {
        return props.setAttributes({
          mediaURL:
            "/wp-content/plugins/flipbook-block/viewer.html?file=" +
            media.url +
            "&magazineMode=true",
          mediaID: media.id,
          width: "",
          height: "",
        });
      };

      function onChangeAlignment(newAlignment) {
        props.setAttributes({ alignment: newAlignment });
      }

      return [
        el(
          BlockControls,
          { key: "controls" },
          el(
            "div",
            { className: "components-toolbar" },
            el(MediaUpload, {
              onSelect: onSelectPDF,
              allowedTypes: "application/pdf",
              type: "a",
              render: function (obj) {
                return el(
                  components.Button,
                  {
                    className:
                      "components-icon-button components-toolbar__control",
                    title: i18n.__("Select PDF"),
                    onClick: obj.open,
                  },
                  el(
                    "svg",
                    {
                      className: "dashicon dashicons dashicons-edit-page",
                      width: "24",
                      height: "24",
                      title: i18n.__("Select PDF"),
                    },
                    el("path", {
                      d: "M7 13.8h6v-1.5H7v1.5zM18 16V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2zM5.5 16V4c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5zM7 10.5h8V9H7v1.5zm0-3.3h8V5.8H7v1.4zM20.2 6v13c0 .7-.6 1.2-1.2 1.2H8v1.5h11c1.5 0 2.7-1.2 2.7-2.8V6h-1.5z",
                    })
                  )
                );
              },
            })
          ),
          el(AlignmentToolbar, {
            value: alignment,
            onChange: onChangeAlignment,
          })
        ),
        el(
          InspectorControls,
          { key: "inspector" },
          el(
            components.PanelBody,
            {
              title: i18n.__("Settings"),
              className: "fbb-settings",
              initialOpen: true,
            },
            el(
              "p",
              {},
              i18n.__(
                "You can set a custom size for landscape orientation below."
              )
            ),
            el(
              "p",
              {},
              i18n.__(
                "On portrait, the size is fixed to 100% / 50vw (might need a refresh after window resize/rotation)."
              )
            ),
            el(TextControl, {
              type: "number",
              label: i18n.__("Width (%)"),
              placeholder: "100",
              value: mediaWidth,
              onChange: function (newMediaWidth) {
                props.setAttributes({ mediaWidth: newMediaWidth });
              },
            }),
            el(TextControl, {
              type: "number",
              label: i18n.__("Height (vh)"),
              placeholder: "75",
              value: mediaHeight,
              onChange: function (newMediaHeight) {
                props.setAttributes({ mediaHeight: newMediaHeight });
              },
            })
          )
        ),
        el(
          "div",
          { className: props.className, style: { textAlign: alignment } },
          el(MediaUpload, {
            onSelect: onSelectPDF,
            type: "application/pdf",
            allowedTypes: "application/pdf",
            value: attributes.mediaID,
            render: function (obj) {
              return !attributes.mediaID
                ? el(
                    "div",
                    {
                      className:
                        "components-placeholder block-editor-media-placeholder is-large",
                    },
                    el(
                      "div",
                      {
                        className: "components-placeholder__label",
                      },
                      el("span", {
                        className: "dashicon dashicons dashicons-book",
                        width: "20",
                        height: "20",
                        style: { marginRight: "17px" },
                      }),
                      i18n.__("FlipBook")
                    ),
                    el(
                      components.Button,
                      {
                        className: "button button-large is-primary",
                        onClick: obj.open,
                      },
                      i18n.__("Select PDF")
                    )
                  )
                : el("div", {
                    className: "fbb-button",
                  });
            },
          }),
          !attributes.mediaID
            ? ""
            : el("iframe", {
                src: attributes.mediaURL,
                style: {
                  width: mediaWidth ? mediaWidth + "%" : "100%",
                  height: mediaHeight ? mediaHeight + "vh" : "75vh",
                },
              })
        ),
      ];
    },

    save: function (props) {
      var attributes = props.attributes;
      var mediaWidth = props.attributes.mediaWidth;
      var mediaHeight = props.attributes.mediaHeight;
      var alignment = props.attributes.alignment;

      return el(
        "div",
        {
          className: props.className,
          style: { textAlign: alignment },
        },
        el("iframe", {
          src: attributes.mediaURL,
          style: {
            width: mediaWidth ? mediaWidth + "%" : "100%",
            height: mediaHeight ? mediaHeight + "vh" : "75vh",
          },
        })
      );
    },
  });
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
);
