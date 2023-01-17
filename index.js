$(document).ready(function () {

	const toggleBtn = $("#toggle");
	const circle = $("#circle");
	const expression = $("#output");

	/* =================== theme toggle =================== */

	let toggle_count_left = 0;
	let toggle_count_right = 0;

	$(toggleBtn).click(function (e) { 
		e.preventDefault();

		if (toggle_count_left < 2) {
			circle.animate({
				left: "+=23px",
			});

			toggle_count_left += 1;

			if (toggle_count_left == 1 ) {
				$("#theme-link").attr("href", "./styles/second.css")
			}

			if (toggle_count_left == 2) {
				$("#theme-link").attr("href", "./styles/third.css")
			}
		}

		else {
			
			if (toggle_count_right < 2) {
				circle.animate({
					left: "-=23px",
				});

				toggle_count_right += 1;

				if (toggle_count_right == 1) {
					$("#theme-link").attr("href", "./styles/second.css")
				}

				if (toggle_count_right == 2) {
					$("#theme-link").attr("href", "./styles/first.css")
				}
			}

			if (toggle_count_left == 2 && toggle_count_right == 2) {
				toggle_count_left = 0;
				toggle_count_right = 0;
			}
		}
	});

	/* =================== equations =================== */

	function replaceMul (equation) {
		let index = equation.indexOf("x");
		equation = equation.substr(0, index) + "*" + equation.substr(index+1, equation.length);
		return equation;
	}

	// adding to the expression
	$(".number.data").click(function (e) { 
		e.preventDefault();

		if (expression.val() == 0) {
			expression.val($(this).text());
		}
		else {
			expression.val(expression.val() + $(this).text());
		}
	});

	// backspace
	$("#del").click(function (e) { 
		e.preventDefault();
		let value = expression.val();

		if (!(parseInt(parseFloat(value))) == 0 && !(value.length == 1)) {
			expression.val(value.slice(0, value.length - 1));
		}

		if (value.length == 1) {
			expression.val("0");
		}
	});

	// reset
	$("#reset").click(function (e) { 
		e.preventDefault();
		expression.val("0");
	});

	// equals
	$("#eq").click(function (e) { 
		e.preventDefault();

		let result;

		try {
			if (expression.val().includes("x")) {
				result = eval(replaceMul(expression.val()));
			}
			else {
				result = eval(expression.val());
			}
		}
		catch (e) {
			if (e instanceof SyntaxError) {
				alert("Error! Resetting values.");
				expression.val("0");
				result = 0;
			}

			if (e instanceof TypeError) {
				alert("Error! Resetting values.");
				expression.val("0");
				result = 0
			}
		}

		// show the result
		expression.val(result);
	});
});