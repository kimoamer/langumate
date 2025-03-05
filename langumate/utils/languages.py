import frappe

def add_bootinfo(bootinfo):
    navbar_settings = frappe.get_doc("Navbar Settings")
    bootinfo.languages = {row.language: {
        "name": row.language_name,
        "flag": row.url
    } for row in navbar_settings.language_table}