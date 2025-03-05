import frappe
import os
import click
from frappe import _
from frappe.desk.page.setup_wizard.setup_wizard import make_records
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields



def after_install():
	create_custom_fields(get_custom_fields())
	make_fixtures()


def before_uninstall():
	delete_custom_fields(get_custom_fields())



def get_custom_fields():
	""" Adding Custom fields to masters of ERPNEXT to fully integrate"""
	return {
		"Navbar Settings": [
			{
				"fieldname": "language_table",
				"fieldtype": "Table",
				"label": "Language Table",
				"options": "Language Table",
				"insert_after": "help_dropdown",
			}
		]
	}

def delete_custom_fields(custom_fields: dict):
	"""
	:Removing custom_fields: a dict like `{'Address': [{fieldname: 'eta_*', ...}]}`
	"""
	for doctype, fields in custom_fields.items():
		frappe.db.delete(
			"Custom Field",
			{
				"fieldname": ("in", [field["fieldname"] for field in fields]),
				"dt": doctype,
			},
		)

		frappe.clear_cache(doctype=doctype)

def make_fixtures():
	records = [
		{"doctype": "Language Table","language": "en", "language_name": "English", "url": "/assets/langumate/flags/um.png","parenttype":"Navbar Settings","parent":"Navbar Settings"},
		{"doctype": "Language Table","language": "ar", "language_name": "العربية", "url": "/assets/langumate/flags/sa.png","parenttype":"Navbar Settings","parent":"Navbar Settings"},
	]
	make_records(records)