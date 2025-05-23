extends Node

#======================================= Signals=======================================
signal request_success(data, response_code)
signal request_failed(error_message, error_code)
signal data_received(endpoint: String, data: Dictionary)

#======================================= Configurations=======================================
var base_url: String = "http://localhost:3000/"
var timeout: float = 10.0
var http_request: HTTPRequest

#======================================= Internals=======================================
func _ready() -> void:
	http_request = HTTPRequest.new()
	http_request.timeout = timeout
	add_child(http_request)
	http_request.request_completed.connect(_on_request_completed)
func _exit_tree() -> void:
	if http_request.is_processing():
		http_request.cancel_request()
	if http_request.request_completed.is_connected(_on_request_completed):
		http_request.request_completed.disconnect(_on_request_completed)
	http_request.queue_free()

#======================================= Handle Requests =======================================
func get_request(endpoint: String, headers: PackedStringArray = PackedStringArray()) -> void:
	var url = base_url + endpoint
	var error = http_request.request(url, headers, HTTPClient.METHOD_GET)
	_error_logic(error, "GET")
func post_request(endpoint: String, data: Dictionary, headers: PackedStringArray = PackedStringArray()) -> void:
	send_request(HTTPClient.METHOD_POST, endpoint, data, headers)
func put_request(endpoint: String, data: Dictionary, headers: PackedStringArray = PackedStringArray()) -> void:
	send_request(HTTPClient.METHOD_PUT, endpoint, data, headers)
func delete_request(endpoint: String, data: Dictionary = {}, headers: PackedStringArray = PackedStringArray()) -> void:
	send_request(HTTPClient.METHOD_DELETE, endpoint, data, headers)
	if not headers.has("Content-Type: application/json"):
		headers.append("Content-Type: application/json")
	var url = base_url + endpoint
	var body = JSON.stringify(data)
	var error = http_request.request(url, headers, HTTPClient.METHOD_DELETE, body)
	_error_logic(error, "DELETE")

#======================================= Utilities =======================================
func _error_logic(error: int, method: String, response_code: int = -1) -> void:
	if error != OK:
		var msg = "HTTP %s failed (Error: %d, Status: %d)" % [method, error, response_code]
		push_error(msg)
		emit_signal("request_failed", msg, error)
func send_request(method: int, endpoint: String, data: Dictionary = {}, headers: PackedStringArray = PackedStringArray()) -> void:
	if not headers.has("Content-Type: application/json"):
		headers.append("Content-Type: application/json")
	
	var url = base_url + endpoint
	var body = JSON.stringify(data)
	var error = http_request.request(url, headers, method, body)
	
	var method_name := ""
	match method:
		HTTPClient.METHOD_POST:
			method_name = "POST"
		HTTPClient.METHOD_PUT:
			method_name = "PUT"
		HTTPClient.METHOD_DELETE:
			method_name = "DELETE"
		_:
			method_name = "UNKNOWN"
	_error_logic(error, method_name)

#======================================= Response Handler=======================================
func _on_request_completed(result: int, response_code: int, headers: PackedStringArray, body: PackedByteArray) -> void:
	if result != HTTPRequest.RESULT_SUCCESS:
		_error_logic(result, "HTTP_REQUEST_FAILED", response_code)
		return

	var response_body = body.get_string_from_utf8()
	var json = JSON.new()
	var parse_error = json.parse(response_body)
	if parse_error != OK:
		_error_logic(parse_error, "JSON_PARSE_ERROR")
		return

	var response_data = json.get_data()
	emit_signal("request_success", response_data, response_code)
