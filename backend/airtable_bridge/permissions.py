from rest_framework import permissions


class IsAdministrator(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role.name == ""


def has_any_role_permission(required_roles):
    """_summary_
        Factory function to create a permission class with related required roles.
    Args:
        required_roles (_type_): _description_

    Returns:
        _type_: _description_
    """

    class HasAnyRolePermission(permissions.BasePermission):
        message = "You do not have the required permissions."

        def __init__(self):
            if not isinstance(required_roles, list):
                raise TypeError("Required roles must be a list")

            self.required_roles = required_roles

        def has_permission(self, request, view):
            if not request.user.is_authenticated:
                self.message = "Authentication credentials were not provided."
                return False
            user_role = getattr(request.user, "role", None)
            if user_role is None:
                self.message = "User does not have a role assigned."
                return False

            if user_role.name not in self.required_roles:
                self.message = (
                    f"Access denied. Required roles: {', '.join(self.required_roles)}"
                )
                return False

            return True

    return HasAnyRolePermission
