# angular-saf
Avery simple AngularJS UI prototype for SAF.

## Waht does it?
This is a sample code provides an UI for the application firewall, capable of listing applications and change their properties.
It doesn't feature any fancy JavaScript build-system or tests, as it' focussing on the frontend side of things.
We use our very simple Python written HTTP server in order to serve the static JS/CSS/images and proxy requests to SAFs REST API.
The UI code is written to work on the REST API without any middleware (other than serving JS to accomplish the same origin policy).

## What do I need?
You have to install and run the latest application firewall and make sure it has an admin/admin account (this is actually hard-coded in the JS right now).
Change the hostname / port in the proxy.py if you need to. Then run the proxy.py (it should run with a standard Python installation) and navigate to
http://localhost:8000/index.html to see the UI.

