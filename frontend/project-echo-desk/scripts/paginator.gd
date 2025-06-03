extends HBoxContainer

@onready var prevbtn: Button = $prevbtn
@onready var pages_container: BoxContainer = $"pages-container"
@onready var pages: HBoxContainer = $"pages-container/pages"
@onready var _1_st: Button = $"pages-container/pages/1st"
@onready var _2_nd: Button = $"pages-container/pages/2nd"
@onready var _3_rd: Button = $"pages-container/pages/3rd"
@onready var _4_th: Button = $"pages-container/pages/4th"
@onready var line_edit: LineEdit = $"pages-container/pages/LineEdit"
@onready var endofpage: Button = $"pages-container/pages/endofpage"
@onready var findpage: Button = $"pages-container/pages/findpage"
@onready var nextbtn: Button = $nextbtn

var current_page: int = 1
var total_pages: int = 1

func _ready() -> void:
	prevbtn.pressed.connect(_on_prevbtn_pressed)
	nextbtn.pressed.connect(_on_nextbtn_pressed)
	_1_st.pressed.connect(func(): fetch_page(int(_1_st.text)))
	_2_nd.pressed.connect(func(): fetch_page(int(_2_nd.text)))
	_3_rd.pressed.connect(func(): fetch_page(int(_3_rd.text)))
	_4_th.pressed.connect(func(): fetch_page(int(_4_th.text)))
	endofpage.pressed.connect(func(): fetch_page(total_pages))
	findpage.pressed.connect(_on_findpage_pressed)

func set_pagination_info(page: int, total: int) -> void:
	current_page = page
	total_pages = total

	_1_st.text = str(clamp(page, 1, total))
	_2_nd.text = str(clamp(page + 1, 1, total))
	_3_rd.text = str(clamp(page + 2, 1, total))
	_4_th.text = str(clamp(page + 3, 1, total))
	endofpage.text = str(total)

	prevbtn.disabled = current_page <= 1
	nextbtn.disabled = current_page >= total_pages

func fetch_page(page: int) -> void:
	page = clamp(page, 1, total_pages)

	var http_manager = get_node("/root/Main/content/HTTPManager")  # Adjust to your actual node path
	var content = get_node("/root/Main/content")  # where _populate_list() is defined

	http_manager.job("http://localhost:3000/clients?page=%d" % page
	).charset("utf-8"
	).on_success(func(job):
		content._populate_list(job)
	).fetch()

func _on_prevbtn_pressed() -> void:
	if current_page > 1:
		fetch_page(current_page - 1)

func _on_nextbtn_pressed() -> void:
	if current_page < total_pages:
		fetch_page(current_page + 1)

func _on_findpage_pressed() -> void:
	var input_page = int(line_edit.text)
	if input_page > 0 and input_page <= total_pages:
		fetch_page(input_page)
	else:
		line_edit.clear()
		line_edit.placeholder_text = "Invalid page"
