import click
from langumate.setup import after_install as setup


def after_install():
	try:
		print("Setting up Language Innomate...")
		setup()

		click.secho("Thank you for installing Language Innomate!", fg="green")

	except Exception as e:
		BUG_REPORT_URL = "https://github.com/kimoamer/Error-Management/issues/new"
		click.secho(
			"Installation for Language Innomate app failed due to an error."
			" Please try re-installing the app or"
			f" report the issue on {BUG_REPORT_URL} if not resolved.",
			fg="bright_red",
		)
		raise e