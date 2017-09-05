/**
 * Full HTML5 compatibility rule set
 * Loosened and extended ruleset. Allows more freedom on user side
 * These rules define which tags and CSS classes are supported and which tags should be specially treated.
 */

var wysihtml5ParserRulesDefaults = {
    "blockLevelEl": {
        "keep_styles": {
            "textAlign": /^((left)|(right)|(center)|(justify))$/i,
            "float": 1
        },
        "add_style": {
            "align": "align_text"
        },
        "check_attributes": {
            "id": "any"
        }
    },
    "inlineLevelEl": {
            "keep_styles": {
                "color": 1,
                "backgroundColor": 1,
                "fontFamily": 1,
                "fontSize": 1
            },
            "remove_action": "unwrap",
            "check_attributes": {
                "id": "any",
                "class": "any",
                "aria-hidden": 'any'
            }
    },

    "makeDiv": {
        "rename_tag": "div",
        "one_of_type": {
            "alignment_object": 1
        },
        "remove_action": "unwrap",
        "keep_styles": {
            "textAlign": 1,
            "float": 1
        },
        "add_style": {
            "align": "align_text"
        },
        "check_attributes": {
            "id": "any"
        }
    }
};

var wysihtml5ParserRules = {
    /**
     * CSS Class white-list
     * Following CSS classes won't be removed when parsed by the wysihtml5 HTML parser
     * If all classes should pass "any" as classes value. Ex: "classes": "any"
     */
    "classes": "any",

    /* blacklist of classes is only available if classes is set to any */
    "classes_blacklist": {
        "Apple-interchange-newline": 1,
        "MsoNormal": 1,
        "MsoPlainText": 1
    },
    
    "type_definitions": {
        
        "alignment_object": {
            /*"classes": {
                "wysiwyg-text-align-center": 1,
                "wysiwyg-text-align-justify": 1,
                "wysiwyg-text-align-left": 1,
                "wysiwyg-text-align-right": 1,
                "wysiwyg-float-left": 1,
                "wysiwyg-float-right": 1
            },*/"classes": {
                "align center": 1,
                "align justify": 1,
                "align left": 1,
                "align right": 1,
                "left": 1,
                "right": 1
            },
            "styles": {
                "float": ["left", "right"],
                "text-align": ["left", "right", "center"]
            }
        },
        
        "valid_image_src": {
            "attrs": {
                "src": /^[^data\:]/i
            }
        },
        
        "text_color_object": {
          "styles": {
            "color": true,
            "background-color": true
          }
        },
        
        "text_fontsize_object": {
          "styles": {
            "font-size": true
          }
        }
    },

    "comments": 1, // if set allows comments to pass
    
    /**
     * Tag list
     *
     * The following options are available:
     *
     *    - add_class:        converts and deletes the given HTML4 attribute (align, clear, ...) via the given method to a css class
     *                        The following methods are implemented in wysihtml5.dom.parse:
     *                          - align_text:  converts align attribute values (right/left/center/justify) to their corresponding css class "wysiwyg-text-align-*")
     *                            <p align="center">foo</p> ... becomes ... <p> class="wysiwyg-text-align-center">foo</p>
     *                          - align_img:    converts align attribute values (right/left) on <img> to their corresponding css class "wysiwyg-float-*"
     *                          
     *    - remove:             removes the element and its content
     *
     *    - unwrap              removes element but leaves content
     *
     *    - rename_tag:         renames the element to the given tag
     *
     *    - set_class:          adds the given class to the element (note: make sure that the class is in the "classes" white list above)
     *
     *    - set_attributes:     sets/overrides the given attributes
     *
     *    - check_attributes:   checks the given HTML attribute via the given method
     *                            - url:            allows only valid urls (starting with http:// or https://)
     *                            - src:            allows something like "/foobar.jpg", "http://google.com", ...
     *                            - href:           allows something like "mailto:bert@foo.com", "http://google.com", "/foobar.jpg"
     *                            - alt:            strips unwanted characters. if the attribute is not set, then it gets set (to ensure valid and compatible HTML)
     *                            - numbers:  ensures that the attribute only contains numeric characters
     *                            - any:            allows anything to pass 
     */
    "tags": {
        "strike": {
            "unwrap": 1
        },
        "form": {},
        "rt": {
            "rename_tag": "span"
        },
        "code": {},
        "acronym": {
            "rename_tag": "span"
        },
        "br": {},
        "details": {
            "unwrap": 1
        },
        "title": {
            "remove": 1
        },
        "multicol": {
            "unwrap": 1
        },
        "figure": {},
        "figcaption": {},
        "xmp": {
            "unwrap": 1
        },
        "small": {},
        "area": {
            "remove": 1
        },
        "time": {
            "unwrap": 1
        },
        "dir": {
            "rename_tag": "ul"
        },
        "bdi": {
            "unwrap": 1
        },
        "command": {
            "unwrap": 1
        },
        "progress": {
            "rename_tag": "span"
        },
        "dfn": {
            "unwrap": 1
        },
        "iframe": {
            "check_attributes": {
                "src": "any",
                "width": "any",
                "height": "any",
                "frameborder": "any",
                "style": "any",
                "id": "any"
            }
        },
        "a": {
            "check_attributes": {
                "href": "href", // if you compiled master manually then change this from 'url' to 'href'
                "rel": "any",
                "target": "any",
                "id": "any"
            }
        },
        "img": {
            "one_of_type": {
                "valid_image_src": 1
            },
            "check_attributes": {
                "width": "numbers",
                "alt": "alt",
                "title": "any",
                //"src": "src", // if you compiled master manually then change this from 'url' to 'src'
                "src": "any", // if you compiled master manually then change this from 'url' to 'src'
                "height": "numbers",
                "id": "any"
            },
            "add_class": {
                "align": "any"
            }
        },
        "rb": {
            "unwrap": 1
        },
        "noframes": {
            "remove": 1
        },
        "abbr": {
            "unwrap": 1
        },
        "bgsound": {
            "remove": 1
        },
        "address": {},
        "basefont": {
            "remove": 1
        },
        "header": wysihtml5ParserRulesDefaults.blockLevelEl,
        "nav": wysihtml5ParserRulesDefaults.blockLevelEl,
        "section": wysihtml5ParserRulesDefaults.blockLevelEl,
        "aside": wysihtml5ParserRulesDefaults.blockLevelEl,
        "article": wysihtml5ParserRulesDefaults.blockLevelEl,
        "footer": wysihtml5ParserRulesDefaults.blockLevelEl,
        "h1": wysihtml5ParserRulesDefaults.blockLevelEl,
        "h2": wysihtml5ParserRulesDefaults.blockLevelEl,
        "h3": wysihtml5ParserRulesDefaults.blockLevelEl,
        "h4": wysihtml5ParserRulesDefaults.blockLevelEl,
        "h5": wysihtml5ParserRulesDefaults.blockLevelEl,
        "h6": wysihtml5ParserRulesDefaults.blockLevelEl,
        "head": {
            "unwrap": 1
        },
        "ul": {
            "check_attributes": {
                "id": "any"
            }
        },
        "ol": {},
        "li": {},
        "dl": {},
        "dt": {},
        "dd": {},
        "object": {
            "remove": 1
        },
        
        "div": {
            "keep_styles": {
                "textAlign": 1,
                "float": 1
            },
            "add_style": {
                "align": "align_text"
            },
            "check_attributes": {
                "data-*": "any"
            }
        },
        "option": {
            "remove":1
        },
        "select": {
            "remove":1
        },
        "track": {
            "remove": 1
        },
        "wbr": {
            "remove": 1
        },
        "fieldset": {
            "unwrap": 1
        },
        "big": {
            "rename_tag": "span",
            "set_class": "wysiwyg-font-size-larger"
        },
        "button": {},
        "noscript": {
            "remove": 1
        },
        "svg": {},
        "input": {
            "remove": 1
        },
        "table": {
            "keep_styles": {
                "width": 1,
                "textAlign": 1,
                "float": 1
            },
            "check_attributes": {
                "id": "any"
            }
        },
        "thead": {
            "add_style": {
                "align": "align_text"
            },
            "check_attributes": {
                "id": "any"
            }
        },
        "tbody": wysihtml5ParserRulesDefaults.blockLevelEl,
        "tr": {
            "add_style": {
                "align": "align_text"
            },
            "check_attributes": {
                "id": "any"
            }
        },
        "th": {
            "check_attributes": {
                "rowspan": "numbers",
                "colspan": "numbers",
                "valign": "any",
                "align": "any",
                "id": "any"
            },
            "keep_styles": {
                "backgroundColor": 1,
                "width": 1,
                "height": 1
            },
            "add_style": {
                "align": "align_text"
            }
        },
        "td": {
            "check_attributes": {
                "rowspan": "numbers",
                "colspan": "numbers",
                "valign": "any",
                "align": "any",
                "id": "any",
                "class": "any"
            },
            "keep_styles": {
                "backgroundColor": 1,
                "width": 1,
                "height": 1
            },
            "add_style": {
                "align": "align_text"
            }
        },
        "tfoot": wysihtml5ParserRulesDefaults.blockLevelEl,
        "keygen": {
            "remove": 1
        },
        "meta": {
            "remove": 1
        },
        "map": {
            "remove": 1
        },
        "isindex": {
            "remove": 1
        },
        "mark": {
            "unwrap": 1
        },
        "caption": wysihtml5ParserRulesDefaults.blockLevelEl,
        "base": {
            "remove": 1
        },
        "video": {},
        "canvas": {},
        "output": {
            "unwrap": 1
        },
        "marquee": {
            "unwrap": 1
        },
        "q": {
            "check_attributes": {
                "cite": "url",
                "id": "any"
            }
        },
        "applet": {
            "remove": 1
        },
        "span": wysihtml5ParserRulesDefaults.inlineLevelEl,
        "b": wysihtml5ParserRulesDefaults.inlineLevelEl,
        "i": wysihtml5ParserRulesDefaults.inlineLevelEl,
        "s": {
            "rename_tag": "del"
        },
        "del": {},
        "u": wysihtml5ParserRulesDefaults.inlineLevelEl,
        "strong": wysihtml5ParserRulesDefaults.inlineLevelEl,
        "em": wysihtml5ParserRulesDefaults.inlineLevelEl,
        "sup": {},
        "sub": {},
        "rp": {
            "unwrap": 1
        },
        "spacer": {
            "remove": 1
        },
        "source": {
            "remove": 1
        },
        "frame": {
            "remove": 1
        },
        "html": {
            "unwrap": 1
        },
        "body": {
            "unwrap": 1
        },
        "nobr": {
            "unwrap": 1
        },
        "summary": {
            "unwrap": 1
        },
        "var": {
            "unwrap": 1
        },
        "blockquote": {
            "keep_styles": {
                "textAlign": 1,
                "float": 1
            },
            "add_style": {
                "align": "align_text"
            },
            "check_attributes": {
                "cite": "url",
                "id": "any"
            }
        },
        "style": {
            "check_attributes": {
                "type": "any",
                "src": "any",
                "charset": "any"
            }
        },
        "device": {
            "remove": 1
        },
        "meter": {
            "unwrap": 1
        },
        "textarea": {
            "unwrap": 1
        },
        "embed": {
            "remove": 1
        },
        "hgroup": {
            "unwrap": 1
        },
        "font": {
            "rename_tag": "span",
            "add_class": {
                "size": "size_font"
            }
        },
        "tt": {
            "unwrap": 1
        },
        "noembed": {
            "remove": 1
        },
        "blink": {
            "unwrap": 1
        },
        "plaintext": {
            "unwrap": 1
        },
        "xml": {
            "remove": 1
        },
        "param": {
            "remove": 1
        },
        "legend": {
            "unwrap": 1
        },
        "hr": {},
        "label": {},
        "kbd": {
            "unwrap": 1
        },
        "listing": {
            "unwrap": 1
        },
        "nextid": {
            "remove": 1
        },
        "pre": {},
        "center": wysihtml5ParserRulesDefaults.makeDiv,
        "audio": {
            "remove": 1
        },
        "datalist": {
            "unwrap": 1
        },
        "samp": {
            "unwrap": 1
        },
        "col": {
            "remove": 1
        },
        "cite": {},
        "link": {
            "remove": 1
        },
        "script": {
            "check_attributes": {
                "type": "any",
                "src": "any",
                "charset": "any"
            }
        },
        "bdo": {
            "unwrap": 1
        },
        "menu": {
            "rename_tag": "ul"
        },
        "colgroup": {
            "remove": 1
        },
        "ruby": {
            "unwrap": 1
        },
        "ins": {
            "unwrap": 1
        },
        "p": wysihtml5ParserRulesDefaults.blockLevelEl,
        "comment": {
            "remove": 1
        },
        "frameset": {
            "remove": 1
        },
        "optgroup": {
            "unwrap": 1
        }
    }
};


(function() {
    // Paste cleanup rules universal for all rules (also applied to content copied from editor)
    var commonRules = wysihtml5.lang.object(wysihtml5ParserRules).clone(true);
    commonRules.comments    = false;
    commonRules.selectors   = { "a u": "unwrap"};
    commonRules.tags.style  = { "remove": 1 };
    commonRules.tags.script = { "remove": 1 };
    commonRules.tags.head = { "remove": 1 };
    
    // Paste cleanup for unindentified source
    var universalRules = wysihtml5.lang.object(commonRules).clone(true);
    /*universalRules.tags.div.one_of_type.alignment_object = 1;
    universalRules.tags.div.remove_action = "unwrap";
    universalRules.tags.div.check_attributes.style = false;
    universalRules.tags.div.keep_styles = {
        "textAlign": /^((left)|(right)|(center)|(justify))$/i,
        "float": 1
    };*/
    universalRules.tags.span.keep_styles = false;

    // Paste cleanup for MS Office
    // TODO: should be extended to stricter ruleset, as current set will probably not cover all Office bizarreness
    var msOfficeRules = wysihtml5.lang.object(universalRules).clone(true);
    msOfficeRules.classes = {};

    window.wysihtml5ParserPasteRulesets = [
        {
            condition: /<font face="Times New Roman"|class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument|class="OutlineElement|id="?docs\-internal\-guid\-/i,
            set: msOfficeRules
        },{
            condition: /<meta name="copied-from" content="wysihtml5">/i,
            set: commonRules
        },{
            set: universalRules
        }
    ];

})();
