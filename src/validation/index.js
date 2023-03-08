import * as apiLogin from "../api/apiLogin";
const Validation = (formSelector, option) => {
  if (!option) {
    option = {};
  }
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  var formRules = {};
  // xử lý khi có element trong DOM
  var validatorRules = {
    require: function (value) {
      return value ? undefined : "vui lòng nhập trường hợp  này";
    },
    email: function (value) {
      var regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
      return regex.test(value) ? undefined : "trường này phải là Email";
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `vui lòng nhập lớn hơn ${min} kí tự`;
      };
    },
  };

  if (formSelector) {
    var inputs = formSelector.querySelectorAll("[name][rules]");
    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");
      for (var rule of rules) {
        var isRulehasValue = rule.includes(":");
        var ruleInfo;
        if (isRulehasValue) {
          ruleInfo = rule.split(":");

          rule = ruleInfo[0];
        }
        var ruleFunc = validatorRules[rule];
        if (isRulehasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }

      // lắng nghe sự kiện
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }
    function handleValidate(event) {
      var rules = formRules[event.target.name];
      var errorMessage;
      rules.find(function (rule) {
        errorMessage = rule(event.target.value);
        return errorMessage;
      });
      if (errorMessage) {
        var formGroup = getParent(event.target, ".form-select");

        if (formGroup) {
          formGroup.classList.add("invalid");
          var formMessage = formGroup.querySelector(".form-message");
          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }
      return !errorMessage;
    }
    function handleClearError(event) {
      var formGroup = getParent(event.target, ".form-select");
      if (formGroup.classList.contains("invalid")) {
        formGroup.classList.remove("invalid");
        var formMessage = formGroup.querySelector(".form-message");
        if (formMessage) {
          formMessage.innerText = "";
        }
      }
    }
    // xử lý submit
    formSelector.onsubmit = function (e) {
      e.preventDefault();
      var inputs = formSelector.querySelectorAll("[name][rules]");
      var isValid = true;
      for (var input of inputs) {
        if (!handleValidate({ target: input })) {
          isValid = false;
        }
      }
      //khi không có lỗi

      if (isValid) {
        if (typeof option.onSubmit === "function") {
          var enableInput = formSelector.querySelectorAll(
            "[name]:not([disabled])"
          );
          var formValues = Array.from(enableInput).reduce(function (
            values,
            input
          ) {
            switch (input.type) {
              case "radio":
                values[input.name] = formSelector.querySelector(
                  'input[name ="' + input.name + '"]:checked'
                ).value;
                break;
              case "checkbox":
                if (!input.matches(":checked")) return values;
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              case "file":
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }

            return values;
          },
          {});
          // fetch API
          const fetchApi = async () => {
            const messageLogin = formSelector.querySelector(".message");
            const data = await apiLogin.LoginAPI();
            data.forEach((getdata) => {
              if (formValues.email === getdata.Email &&formValues.password === getdata.Password) {
                option.onSubmit(getdata)
                const jsonParam = JSON.stringify(getdata)
                localStorage.setItem('login',jsonParam)
                window.location.reload();
              } 
             
            });
          };
          fetchApi();
        }
      }
    };
  }
};
export default Validation;
