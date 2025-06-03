# user_data.gd
extends Node
class_name UserData

var id_user: int
var username: String
var password_hash: String
var full_name: String
var email: String
var created_at: String
var updated_at: String

static func safe_get(dict: Dictionary, key: String, default_value) -> Variant:
	return dict[key] if dict.has(key) and dict[key] != null else default_value

static func from_dict(dict: Dictionary) -> UserData:
	var u := UserData.new()
	u.id_user = safe_get(dict, "id_user", 0)
	u.username = safe_get(dict, "username", "")
	u.password_hash = safe_get(dict, "password_hash", "")
	u.full_name = safe_get(dict, "full_name", "")
	u.email = safe_get(dict, "email", "")
	u.created_at = safe_get(dict, "created_at", "")
	u.updated_at = safe_get(dict, "updated_at", "")
	return u
