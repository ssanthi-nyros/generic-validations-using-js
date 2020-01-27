//text boxes validation
function text(tex) {
    var type = tex.getAttribute("type")
    var textError = tex.name + "error";
    var minlen = tex.getAttribute("min");
    var maxlen = tex.getAttribute("max");
    if (minlen == null) minlen = 2;
    if (maxlen == null) maxlen = 30;

    if (type == "text") {

        var len = tex.value.length;
        if (len == 0) {
            document.getElementById(textError).innerHTML = "minimum 2 characters";
            document.getElementById(textError).style.color = "red";
            return false;
        } else if (len >= minlen && len <= maxlen) {
            document.getElementById(textError).innerHTML = "";
            return true;
        }

    }

}

//Email validation

function email(e) {
    var type = e.getAttribute("type");
    var emailError = e.name + "error";


    if (type == "email") {
        var emailmatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var len = e.value.length;
        if (len > 0 && emailmatch.test(e.value) == false) {
            document.getElementById(emailError).innerHTML = " Enter a valid email address";
            document.getElementById(emailError).style.color = "red";
            return false;
        }
        if (len > 0 && emailmatch.test(e.value) == true) {
            document.getElementById(emailError).innerHTML = "";
            return true;
        }
    }
}
// mobile number validation

function tel(t) {
    var type = t.getAttribute("type");
    var telError = t.name + "error";

    if (type == "tel") {
        var phoneno = /[7-9]\d{9}/;
        var len = t.value.length;
        if (len > 0 && phoneno.test(t.value) == false) {

            document.getElementById(telError).innerHTML = "Enter a valid phone number";
            document.getElementById(telError).style.color = "red";
            return false;
        }
        document.getElementById(telError).innerHTML = "";
        return true;


    }
}


//onfocus function

function myFocus(f) {

    var Errorf = f.name + "error";
    if (f.value.length == 0 && !document.getElementById(Errorf)) {
        var WarnMsg = document.createElement('span');
        WarnMsg.id = Errorf;
        WarnMsg.textContent = "please fill the field";
        WarnMsg.style.color = "red";
        f.parentNode.appendChild(WarnMsg);
    }
}


//Form Validation

function validation(form) {

    var elements = document.forms[0].elements;
    var radioc = 0,
        radiob = 0;;

    for (var i = 0; i < elements.length; i++) {
        var minlen = elements[i].getAttribute("min");
        var maxlen = elements[i].getAttribute("max");
        var type = elements[i].type;
        var textRegex = /^[A-Za-z0-9]/;
        var emailmatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


        if (type == "text") {
            if (minlen == null) minlen = 2;
            if (maxlen == null) maxlen = 30;
            if (elements[i].value.length < minlen || elements[i].value.length > maxlen) {
                elements[i].focus();

                return false;
            } else if (elements[i].value.length > minlen && elements[i].value.length < maxlen && textRegex.test(elements[i]).value == false) {
                elements[i].focus();

                return false;
            }
        } else if (type == "tel") {
            if (elements[i].value.length == 0) {
                elements[i].focus();

                return false;
            }
            if (phoneno.test(elements[i].value) != true) {
                elements[i].focus();

                return false;
            }
        } else if (type == "email") {

            if (elements[i].value.length == 0) {
                elements[i].focus();

                return false;
            }
            if (emailmatch.test(elements[i].value) != true) {
                elements[i].focus();

                return false;
            }
        } else if (type == "checkbox") {
            var checkbtn = document.getElementsByName("day");
            var ch = 0;
            for (var m = 0; m < checkbtn.length; m++) {
                if (checkbtn[m].checked) {
                    ch++;
                    elements[i].style.outline = "1px  solid #842814";
                }
            }
            if (ch == 0) {
                checkbtn[0].focus();
                elements[i].style.outline = "1px solid #842814";
                return false;
            }
        } else if (type == "radio") {
            var len = elements[i].parentNode.children.length;
            for (var j = 0; j < len; j++) {
                if (elements[i].parentNode.children[j].type == "radio") {
                    radiob++;
                }
                if (elements[i].parentNode.children[j].checked == true) {
                    radioc++;
                    elements[i].style.outline = "0px";
                }
            }
            if (radiob > 0 && radioc == 0) {
                elements[i].focus();
                elements[i].style.outline = "1px solid red";
                return false;
            } else {
                radiob = 0;
                radioc = 0;
            }
        } else if (type == "select-one") {
            if (elements[i].value == "0" || elements[i].value == "" || elements[i].value == "-1" || elements[i].value == " ") {
                elements[i].focus();
                elements[i].style.border = "1px solid #842814";
                return false;
            } else if (elements[i].value != "0") {
                elements[i].style.outline = "1px solid #842814";
            }

        }

    }

}

// main function for all the fields


window.onload = function() {
    var inputs = document.forms[0].elements;
    var i;


    //text boxes
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "text") {
            inputs[i].onfocus = function() {
                myFocus(this);
            }
            inputs[i].onkeyup = function() {
                text(this);
            }
        }



        // email validation
        if (inputs[i].type == "email") {
            inputs[i].onfocus = function() {
                myFocus(this);
            }
            inputs[i].onkeyup = function() {
                email(this);
            }
        }

        // phone validation

        if (inputs[i].type == "tel") {
            inputs[i].onfocus = function() {
                myFocus(this);
            }
            inputs[i].onkeyup = function() {
                tel(this);
            }
        }



    }
}