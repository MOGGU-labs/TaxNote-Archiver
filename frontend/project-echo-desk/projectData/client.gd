extends Control
#this is client gd
const RECORD_INFO = preload("res://scenes/record_info.tscn")
@onready var table_container = $Container/TableContainer  # TableContainer has its own script
@onready var returnbtn: Button = $Container/returnbtn


func _populate_list(job) -> void:
	var body = job.response_body.get_string_from_utf8()
	var response_data = JSON.parse_string(body)

	if typeof(response_data) != TYPE_DICTIONARY:
		print("Unexpected response format.")
		return

	var data = response_data.get("data", [])
	var page = response_data.get("page", 1)
	var limit = response_data.get("limit", 10)
	var total_pages = response_data.get("totalPages", 1)

	if table_container.has_method("set_client_data"):
		table_container.set_client_data(data, page, limit)

	if has_node("../paginator"):
		var paginator = get_node("../paginator")
		if paginator.has_method("set_pagination_info"):
			paginator.set_pagination_info(page, total_pages)



@onready var pagenumber: LineEdit = $Container/pagefinder/pagenumber
@onready var select_page: Button = $Container/pagefinder/selectpage
var token: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQ5MDE2NzcwLCJleHAiOjE3NDkwMTczNzB9.UmdiSJJdq7jNm1IQT8ktPd-Aqs4DZWDQgs__VxpG-hc"
func _ready() -> void:
	pagenumber.text = "1"

	$HTTPManager.job("http://localhost:3000/clients"
	).add_header("Authorization", "Bearer %s" %token
	).charset("utf-8"
	).on_success(func(job):
		_populate_list(job)
		print("✅ Successfully fetched clients")
	).on_failure(
		func( _response ): print("💀 Not Authorized")
	).fetch()

func _on_selectpage_pressed() -> void:
	var page_input = pagenumber.text.strip_edges()
	var page_num = int(page_input)
	
	if page_num <= 0:
		print("❌ Invalid page number.")
		return
	for child in table_container.get_children():
		child.queue_free()
		
	var url = "http://localhost:3000/clients?page=%d" % page_num
	
	$HTTPManager.job(url
	).add_header("Authorization", "Bearer %s" %token
	).charset("utf-8"
	).on_success(func(job):
		_populate_list(job)
		print("✅ Successfully fetched clients")
	).on_failure(
		func( _response ): print("💀 Not Authorized Token")
	).fetch()

func _on_returnbtn_pressed() -> void:
	var page = get_node("../../Page")
	page.visible = true
	var content = get_node("../../content")  # This should be the "Container" node
	# Free all children inside content instead of content itself
	for child in content.get_children():
		child.queue_free()
