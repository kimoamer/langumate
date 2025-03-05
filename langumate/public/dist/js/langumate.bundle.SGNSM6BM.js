(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };

  // frappe-html:/home/frappe/frappe-bench/apps/langumate/langumate/public/js/frappe/ui/toolbar/navbar.html
  frappe.templates["navbar"] = `<div class="sticky-top">
	<header class="navbar navbar-expand" role="navigation">
		<div class="container">
			<a class="navbar-brand navbar-home" href="/app">
				<img
					class="app-logo"
					src="{{ frappe.boot.app_logo_url }}"
					alt="{{ __("App Logo") }}"
				>
			</a>
			<ul class="nav navbar-nav d-none d-sm-flex" id="navbar-breadcrumbs"></ul>
			<div class="collapse navbar-collapse justify-content-end">
				<form class="form-inline fill-width justify-content-end" role="search" onsubmit="return false;">
					{% if (frappe.boot.read_only) { %}
						<span class="indicator-pill yellow no-indicator-dot" title="{%= __("Your site is undergoing maintenance or being updated.") %}">
							{%= __("Read Only Mode") %}
						</span>
					{% } %}
					{% if (frappe.boot.user.impersonated_by) { %}
						<span class="indicator-pill red no-indicator-dot" title="{%= __("You are impersonating as another user.") %}">
							{%= __("Impersonating {0}", [frappe.boot.user.name]) %}
						</span>
					{% } %}
					<div class="input-group search-bar text-muted hidden">
						<input
							id="navbar-search"
							type="text"
							class="form-control"
							placeholder="{%= __('Search or type a command ({0})', [frappe.utils.is_mac() ? '\u2318 + G' : 'Ctrl + G']) %}"
							aria-haspopup="true"
						>
						<span class="search-icon">
							<svg class="icon icon-sm"><use href="#icon-search"></use></svg>
						</span>
					</div>
				</form>
				<ul class="navbar-nav">
					<li class="nav-item dropdown dropdown-notifications dropdown-mobile hidden">
						<button
							class="btn-reset nav-link notifications-icon text-muted"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<span class="notifications-seen">
								<span class="sr-only">{{ __("No new notifications") }}</span>
								<svg class="es-icon icon-sm" style="stroke:none;"><use href="#es-line-notifications"></use></svg>
							</span>
							<span class="notifications-unseen">
								<span class="sr-only">{{ __("You have unseen notifications") }}</span>
								<svg class="es-icon icon-sm"><use href="#es-line-notifications-unseen"></use></svg>
							</span>
						</button>
						<div class="dropdown-menu notifications-list dropdown-menu-right" role="menu">
							<div class="notification-list-header">
								<div class="header-items"></div>
								<div class="header-actions"></div>
							</div>
							<div class="notification-list-body">
								<div class="panel-notifications"></div>
								<div class="panel-events"></div>
								<div class="panel-changelog-feed"></div>
							</div>
						</div>
					</li>
					<li class="nav-item dropdown dropdown-message dropdown-mobile hidden">
						<button
							class="btn-reset nav-link notifications-icon text-muted"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="true"
						>
							<span>
								<svg class="es-icon icon-sm"><use href="#es-line-chat-alt"></use></svg>
							</span>
						</button>
					</li>
                    <li class="nav-item dropdown dropdown-language dropdown-mobile hidden">
                        <button type="button" class="btn-reset nav-link text-muted" data-toggle="dropdown"
                        aria-expanded="true" aria-haspopup="true" >
                            <img id="header-lang-img" src="/assets/langumate/flags/um.png" alt="Header Language" style="height:16px">
                        </button>
                        <div class="dropdown-menu languages-list dropdown-menu-right" role="menu" ></div>
					</li>
					<li class="vertical-bar d-none d-sm-block"></li>
					<li class="nav-item dropdown dropdown-help dropdown-mobile d-none d-lg-block">
						<button
							class="btn-reset nav-link"
							data-toggle="dropdown"
							aria-controls="toolbar-help"
							aria-label="{{ __("Help Dropdown") }}"
						>
							<span>
								{{ __("Help") }}
								<svg class="es-icon icon-xs"><use href="#es-line-down"></use></svg>
							</span>
						</button>
						<div class="dropdown-menu dropdown-menu-right" id="toolbar-help" role="menu">
							<div id="help-links"></div>
							<div class="dropdown-divider documentation-links"></div>
							{% for item in navbar_settings.help_dropdown %}
								{% if (!item.hidden) { %}
									{% if (item.route) { %}
										<a class="dropdown-item" href="{{ item.route }}">
											{%= __(item.item_label) %}
										</a>
									{% } else if (item.action) { %}
										<button class="btn-reset dropdown-item" onclick="return {{ item.action }}">
											{%= __(item.item_label) %}
										</button>
									{% } else { %}
										<div class="dropdown-divider"></div>
									{% } %}
								{% } %}
							{% endfor %}
						</div>
					</li>
					<li class="nav-item dropdown dropdown-navbar-user dropdown-mobile">
						<button
							class="btn-reset nav-link"
							data-toggle="dropdown"
							aria-label="{{ __("User Menu") }}"
						>
							{{ avatar }}
						</button>
						<div class="dropdown-menu dropdown-menu-right" id="toolbar-user" role="menu">
							{% for item in navbar_settings.settings_dropdown %}
								{% var condition = item.condition ? eval(item.condition) : true %}
								{% if (condition && !item.hidden) { %}
									{% if (item.route) { %}
										<a class="dropdown-item" href="{{ item.route }}">
											{%= __(item.item_label) %}
										</a>
									{% } else if (item.action) { %}
										<button class="btn-reset dropdown-item" onclick="return {{ item.action }}">
											{%= __(item.item_label) %}
										</button>
									{% } else { %}
										<div class="dropdown-divider"></div>
									{% } %}
								{% } %}
							{% endfor %}
						</div>
					</li>
				</ul>
			</div>
		</div>
	</header>

	{% if !localStorage.getItem("dismissed_announcement_widget") && strip_html(navbar_settings.announcement_widget) != '' %}
	<div class="announcement-widget form-message p-2 m-0" style="position: relative; z-index: -1; border-radius: 0; background-color: var(--bg-blue);">
		<div class="container flex justify-between align-center mx-auto">
			{{ navbar_settings.announcement_widget }}
			<div class="close-message p-0 mr-2" style="position: relative;">
			{{ frappe.utils.icon("close") }}
			</div>
		</div>
	</div>
	{% endif %}

</div>`;

  // ../langumate/langumate/public/js/frappe/ui/toolbar/toolbar.js
  frappe.provide("frappe.ui.toolbar");
  var CustomToolbar = class extends frappe.ui.toolbar.Toolbar {
    constructor() {
      super();
    }
    make() {
      super.make();
      this.add_language_switcher();
    }
    add_language_switcher() {
      var _a;
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
          name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
          flag: "/assets/langumate/flags/sa.png"
        }
      };
      let languages_ = frappe.boot.languages || {};
      let all_lang = __spreadValues(__spreadValues({}, languages_), languages);
      let currentLanguage = frappe.boot.user.language || "en";
      let currentFlag = ((_a = all_lang[currentLanguage]) == null ? void 0 : _a.flag) || "/assets/langumate/flags/us.png";
      $("#header-lang-img").attr("src", currentFlag);
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
      let currentLanguage = frappe.boot.user.language || "en";
      this.dropdown_list.find(".language").on("click", function() {
        var _a;
        let selectedLang = $(this).data("lang");
        if (selectedLang === currentLanguage) {
          frappe.show_alert(__("You are already using this language."));
          return;
        }
        let flagSrc = ((_a = languages[selectedLang]) == null ? void 0 : _a.flag) || "/assets/langumate/flags/um.png";
        $("#header-lang-img").attr("src", flagSrc);
        frappe.call({
          method: "frappe.client.set_value",
          args: {
            doctype: "User",
            name: frappe.session.user,
            fieldname: "language",
            value: selectedLang
          },
          freeze: true,
          freeze_message: __("Refreshing..."),
          callback: function() {
            var _a2;
            frappe.show_alert(__("Language changed to: {0}", [((_a2 = languages[selectedLang]) == null ? void 0 : _a2.name) || selectedLang]));
            window.location.reload();
          }
        });
      });
    }
  };
  frappe.ui.toolbar.Toolbar = CustomToolbar;
})();
//# sourceMappingURL=langumate.bundle.SGNSM6BM.js.map
