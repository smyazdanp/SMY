/// <reference types="vite/client" />

// import $ from "jquery";
import "vazirmatn/Vazirmatn-font-face.css";
import("@fortawesome/fontawesome-free/js/all.min.js");
// import { Swiper } from "swiper";
// import "swiper/swiper.css";

declare global {
	const Swiper: any;
}

const swiper = new Swiper(".swiper", {
	// Optional parameters
	effect: "slider",
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
		},
		// when window width is >= 480px
		480: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		// when window width is >= 640px
		640: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
	},
	spaceBetween: 20,
	direction: "horizontal",
	loop: false,

	// If we need pagination
	pagination: {
		el: ".swiper-pagination",
	},

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	autoplay: {
		delay: 5000,
	},
	// And if we need scrollbar
});

const contactUsFormCon = document.getElementById("contactUsFormCon");

const name_input = (
		<input type="text" name="Name" maxLength={128} placeholder="علی محمدی" onBlur={ValidateName} />
	) as HTMLInputElement,
	mobile_input = (
		<input type="text" name="Mobile" maxLength={14} placeholder="09123456789" onBlur={ValidateMobile} />
	) as HTMLInputElement,
	email_input = (
		<input type="text" name="Email" maxLength={128} placeholder="name@example.com" onBlur={ValidateEmail} />
	) as HTMLInputElement,
	title_input = (
		<input type="text" name="Title" maxLength={128} placeholder="فروشگاهی" onBlur={ValidateTitle} />
	) as HTMLInputElement,
	text_input = <textarea name="Text" maxLength={1024} placeholder="حداکثر 4 خط"></textarea>,
	name_alert = <span class="formError"></span>,
	mobile_alert = <span class="formError"></span>,
	email_alert = <span class="formError"></span>,
	title_alert = <span class="formError"></span>;

function ValidateName() {
	// if (name_input.value.length < 6 || !/^[a-zA-Z؀-ۿ۔-ۯۼ-۾]+$/.test(name_input.value)) {
	if (name_input.value.trim().length < 6 ) {
		name_alert.textContent = "نام کامل باید حداقل 6 حرف و بدون استفاده از عدد یا علامت باشد.";
		return false;
	} else {
		name_alert.textContent = "";
		return true;
	}
}

function ValidateMobile() {
	// if (mobile_input.value.length !== 11 || !/^[0-9]+$/.test(mobile_input.value)) {
	if ( !/^(\+98|0098|98|0)?(9\d{9})$/.test(mobile_input.value)) {
		mobile_alert.textContent = "شماره موبایل معتبر نیست.";
		return false;
	} else {
		name_alert.textContent = "";
		return true;
	}
}

function ValidateEmail() {
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_input.value)) {
		email_alert.textContent = "ایمیل معتبر نمی‌باشد.";
		return false;
	} else {
		name_alert.textContent = "";
		return true;
	}
}

function ValidateTitle() {
	// if (title_input.value.trim(.length < 3 || !/^[a-zA-Z؀-ۿ۔-ۯۼ-۾]+$/.test(title_input.value)) {
	if (title_input.value.trim().length < 3 ) {
		title_alert.textContent = "موضوع باید حداقل 3 حرف بدون عدد یا علامت باشد.";
		return false;
	} else {
		name_alert.textContent = "";
		return true;
	}
}

const Form = (
	<form>
		<div>
			<p>نام و نام خانوادگی</p>
			{name_input}
			{name_alert}
		</div>
		<div>
			<p>تلفن تماس</p>
			{mobile_input}
			{mobile_alert}
		</div>
		<div>
			<p>ایمیل</p>
			{email_input}
			{email_alert}
		</div>
		<div>
			<p>موضوع سایت</p>
			{title_input}
			{title_alert}
		</div>
		<div>
			<p>شرح پروژه و توضیحات</p>
			{text_input}
		</div>

		<div>
			<button
				type="button"
				onClick={() => {
					const IsNameValid = ValidateName();
					const IsMobileValid = ValidateMobile();
					const IsEmailValid = ValidateEmail();
					const IsTitleValid = ValidateTitle();

					if (!(IsNameValid && IsMobileValid && IsEmailValid && IsTitleValid)) {
						return;
					}

					const data = new FormData(Form);
					fetch(import.meta.env.VITE_API_URL, {
						method: "post",
						body: data,
					});
				}}
			>
				ارسال پیام
			</button>
		</div>
	</form>
) as HTMLFormElement;

contactUsFormCon.appendChild(Form);
