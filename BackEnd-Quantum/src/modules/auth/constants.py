from enum import Enum


class ApiKeyPrivilege(str, Enum):
    PROMPT = "prompt"
    #READ_COLLECTIONS = "read_collections"


class UserTokenPurpose(str, Enum):
    PASSWORD_RESET = "password_reset"


class RoleType(str, Enum):
    INDIVIDUAL = "individual"
    ORGANIZATION = "organization"


class UserRole(str, Enum):
    USER = "user"
    SUPER_ADMIN = "superadmin"
    TESTER = "tester"
    ORGANIZATION_MEMBER = "organization_member"
    ORGANIZATION_MANAGER = "organization_manager"
    ORGANIZATION_OWNER = "organization_owner"
