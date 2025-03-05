frappe.provide("frappe.ui.toolbar");

class CustomToolbar extends frappe.ui.toolbar.Toolbar {
    constructor() {
        super();
    }

    make() {
        super.make();
        this.add_language_switcher();
    }

    add_language_switcher() {
        let me = this;

        this.dropdown = $(".navbar").find(".dropdown-language").removeClass("hidden");
        this.dropdown_list = this.dropdown.find(".languages-list");
        this.dropdown_list.empty();
        let languages = {
            en: {
                name: "English",
                flag: "/assets/langumate/flags/um.png"
            },
            ar: {
                name: "العربية",
                flag: "/assets/langumate/flags/sa.png"
            }
        }
        let languages_ = frappe.boot.languages || {};  // Now it's preloaded instantly
        let all_lang = { ...languages_, ...languages }; 
        // Get current language
        let currentLanguage = frappe.boot.user.language || 'en';

        // Set initial flag
        let currentFlag = all_lang[currentLanguage]?.flag || "/assets/langumate/flags/um.png";
        $("#header-lang-img").attr("src", currentFlag);

        // Populate dropdown
        Object.entries(all_lang).forEach(([lang, details]) => {
            let item = `
                <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="${lang}">
                    <img src="${details.flag}" alt="${details.name}" class="me-1" style="height:12px">
                    <span class="align-middle">${details.name}</span>
                </a>`;
            me.dropdown_list.append(item);
        });

        me.bind_language_switcher_events(all_lang);
    }

    bind_language_switcher_events(languages) {
        let me = this;
        let currentLanguage = frappe.boot.user.language || 'en';

        this.dropdown_list.find(".language").on("click", function () {
            let selectedLang = $(this).data("lang");

            if (selectedLang === currentLanguage) {
                frappe.show_alert(__("You are already using this language."));
                return;
            }

            let flagSrc = languages[selectedLang]?.flag || "/assets/langumate/flags/um.png";
            $("#header-lang-img").attr("src", flagSrc);

            frappe.call({
                method: "frappe.client.set_value",
                args: {
                    doctype: 'User',
                    name: frappe.session.user,
                    fieldname: 'language',
                    value: selectedLang
                },
                freeze: true,
                freeze_message: __('Refreshing...'),
                callback: function () {
                    frappe.show_alert(__("Language changed to: {0}", [languages[selectedLang]?.name || selectedLang]));
                    window.location.reload();
                    
                }
            });
        });
    }
}

// Override Frappe's toolbar
frappe.ui.toolbar.Toolbar = CustomToolbar;
