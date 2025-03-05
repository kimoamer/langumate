frappe.provide("frappe.ui.toolbar");

class CustomToolbar extends frappe.ui.toolbar.Toolbar {
    constructor() {
        super();  // Call the original constructor to ensure everything initializes properly
    }

    make() {
        super.make();  // Call the original method first
        this.add_language_switcher();
    }

    add_language_switcher() {
        this.dropdown = $(".navbar").find(".dropdown-language").removeClass("hidden");
        this.dropdown_list = this.dropdown.find(".languages-list");
    
        // Define available languages and flags
        const languages = {
            en: {
                name: "English",
                flag: "/assets/langumate/flags/um.png"
            },
            ar: {
                name: "العربية",
                flag: "/assets/langumate/flags/sa.png"
            }
        };
    
        // Get current language from Frappe user settings
        var currentLanguage = frappe.boot.user.language || 'en';
    
        // Set initial flag based on current language
        $("#header-lang-img").attr("src", languages[currentLanguage]?.flag || languages.en.flag);
    
        // Add both language options to dropdown (you can add more if needed)
        Object.entries(languages).forEach(([lang, details]) => {
            let item = `
                <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="${lang}">
                    <img src="${details.flag}" alt="${details.name}" class="me-1" style="height:12px">
                    <span class="align-middle">${details.name}</span>
                </a>`;
            this.dropdown_list.append(item);
        });
    
        // Bind language switcher click events
        this.bind_language_switcher_events();
    }
    
    
    bind_language_switcher_events() {
        let me = this;
        let currentLanguage = frappe.boot.user.language || 'en';
    
        this.dropdown_list.find(".language").on("click", function () {
            let selectedLang = $(this).data("lang");
            let flagSrc = $(this).find("img").attr("src");
    
            // If user selects the same language, do nothing
            if (selectedLang === currentLanguage) {
                frappe.show_alert(__("You are already using this language."));
                return;
            }
    
            // Immediately update the flag for smoother UX
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
                    frappe.show_alert(__("Language changed to: {0}", [selectedLang]));
    
                    // Delay a bit so the user sees the alert, then reload
                    window.location.reload();
                    
                }
            });
        });
    }
    
    
}

// Override Frappe's toolbar with our extended class
frappe.ui.toolbar.Toolbar = CustomToolbar;