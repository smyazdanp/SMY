<?php
require_once "./secret.php";

if (IsDebugMode) {
	error_reporting(E_ALL);
	ini_set("display_errors", 1);
}

if (IsLocalDevMode) {
	// Allow from any origin
	if (isset($_SERVER["HTTP_ORIGIN"])) {
		header("Access-Control-Allow-Origin: {$_SERVER["HTTP_ORIGIN"]}");
		header("Access-Control-Allow-Credentials: true");
		header("Access-Control-Max-Age: 86400"); // cache for 1 day
	}

	// Access-Control headers are received during OPTIONS requests
	if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {

		if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
			header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

		if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
			header("Access-Control-Allow-Headers: {$_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]}");

		exit(0);
	}
}

$DatabaseFilename = "data/ContactUs.json";
$Submissions = [];

try {
	if ( ! file_exists("data")) {
		mkdir("data");
	}

	if (file_exists($DatabaseFilename)) {
		$Submissions = json_decode(file_get_contents($DatabaseFilename), true);
	}

	$_POST["Name"] = substr(trim($_POST["Name"]), 0, 128) ?? "";
	$_POST["Mobile"] = substr(trim($_POST["Mobile"]), 0, 128) ?? "";
	$_POST["Email"] = substr(trim($_POST["Email"]), 0, 128) ?? "";
	$_POST["Title"] = substr(trim($_POST["Title"]), 0, 128) ?? "";
	$_POST["Text"] = substr(trim($_POST["Text"]), 0, 1024) ?? "";

	$message = "### New Contact Us Submission" .
		"\n **Name:** {$_POST["Name"]}" .
		"\n **Mobile:** {$_POST["Mobile"]}" .
		"\n **Email:** {$_POST["Email"]}" .
		"\n **Title:** {$_POST["Title"]}" .
		"\n **Text:** {$_POST["Text"]}" .
		"\n\n@all";

	$Submissions[] = [
		"Name" => $_POST["Name"],
		"Mobile" => $_POST["Mobile"],
		"Email" => $_POST["Email"],
		"Title" => $_POST["Title"],
		"Text" => $_POST["Text"],
		"DT" => time(),
		"ServerInfo" => $_SERVER,
	];

	file_put_contents($DatabaseFilename, json_encode($Submissions));

	$headers = [
		"Authorization: Bearer " . MATTERMOST_BOT_TOKEN,
		"Content-Type: application/json",
	];
	$data = [
		"channel_id" => MATTERMOST_CHANNEL_ID,
		"message" => $message,
	];

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, MATTERMOST_API_URL);
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	$response = curl_exec($curl);
	curl_close($curl);

	// Check HTTP return code, too; might be something else than 200
	$httpReturnCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

	// Check the return value of curl_exec(), too
	if ($response === false) {
		throw new Exception(curl_error($curl), curl_errno($curl));
	}

	echo "success";

} catch (\Throwable $th) {
	if (IsDebugMode) {
		var_dump($th);
	}
	echo "error";
}
