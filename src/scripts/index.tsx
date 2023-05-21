///
<reference types="vite/client" />

// import $ from "jquery";
import "vazirmatn/Vazirmatn-font-face.css";
import("@fortawesome/fontawesome-free/js/all.min.js");
// import { Swiper } from "swiper";
// import "swiper/swiper.css";

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
const name_alert=<span class="formError"></span>;
const phone_alert=<span class="formError"></span>;
const email_alert=<span class="formError"></span>;
const title_alert=<span class="formError"></span>;

const Form = (
<form>
	<div>
		<p>نام و نام خانوادگی</p>
		<input type="text" name="Name" maxLength={128} placeholder="علی محمدی" onBlur={(n)=>{if
		(n.currentTarget.value.length
		< 6 || !/^[a-zA-Z؀-ۿ۔-ۯۼ-۾]+$/.test(n.currentTarget.value)) {
			name_alert.textContent="نام کامل باید حداقل 6 حرف و بدون استفاده از عدد یا علامت باشد." } else {
			name_alert.textContent="" ; }}} />
		{name_alert}
	</div>
	<div>
		<p>تلفن تماس</p>
		<input type="text" name="Mobile" maxLength={14} placeholder="09123456789" onBlur={(p)=>{if
		(p.currentTarget.value.length !== 11 || !/^[0-9]+$/.test(p.currentTarget.value)) {
		phone_alert.textContent="شماره موبایل معتبر نیست."}
		else {
		phone_alert.textContent="";
		}}}/>
		{phone_alert}
	</div>
	<div>
		<p>ایمیل</p>
		<input type="text" name="Email" maxLength={128} placeholder="name@example.com" onBlur={(e)=>{if
		(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.currentTarget.value)) {
		email_alert.textContent="ایمیل معتبر نمیباشد."}
		else {
		email_alert.textContent="";
		}}} />
		{email_alert}
	</div>
	<div>
		<p>موضوع سایت</p>
		<input type="text" name="Title" maxLength={128} placeholder="فروشگاهی" onBlur={(t)=>{if
		(t.currentTarget.value.length
		< 3 || !/^[a-zA-Z؀-ۿ۔-ۯۼ-۾]+$/.test(t.currentTarget.value)) {
			title_alert.textContent="موضوع باید حداقل 3 حرف بدون عدد یا علامت باشد." } else { title_alert.textContent=""
			; }}} />
		{title_alert}
	</div>
	<div>
		<p>شرح پروژه و توضیحات</p>
		<textarea name="Text" maxLength={1024} placeholder="حداکثر 4 خط"></textarea>
	</div>

	<div>
		<button type="button" onClick={()=> {
			const data = new FormData(Form);
			fetch(import.meta.env.VITE_API_URL, {
			method: "post",
			body: data,
			})
			}}
			>
			ارسال پیام
		</button>
	</div>
</form>
) as HTMLFormElement;

contactUsFormCon.appendChild(Form);