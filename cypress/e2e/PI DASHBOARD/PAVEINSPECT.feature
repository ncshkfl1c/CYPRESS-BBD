Feature: PaveInspectDashBoard

    @ignore-this
    Scenario: Login
        Given I open intro Page "https://paveinspect.com/"
        When I clicks Login at "INTRO PAGE"
        Then I'm redirected to "https://paveinspect.com/login"
        When I type UserName: "PI_1220GBUA", PassWord "123456" and click login
        Then I should be redirected to "https://paveinspect.com/business/dashboard"

    @ignore-this
    Scenario: PaveInspect DashBoard
        Given I open Page "https://paveinspect.com/business/dashboard" with UserName: "PI_1220GBUA" and PassWord "123456"
        When I Check UI in Header
        And I Check UI and function in Filter and Toast

    @ignore-this
    Scenario: Bulk Links
        Given I open Page "https://paveinspect.com/business/links" with UserName: "PI_1220GBUA" and PassWord "123456"
        When I Check UI in Header
        And I check Validate in BulkLink

    Scenario: Manage User
        Given I open Page "https://paveinspect.com/business/users" with UserName: "PI_1220GBUA" and PassWord "123456"
        And I Check UI in Header
        And I check Validate when I create new user
        When I create account
            | role  | userName     | password | email                    | fName | lName |
            | ADMIN | TestAlrUser  | 123456   | tu.dao@discoveryloft.com | tu    | dao   |
            | USER  | InvalidEmail | 123456   | tu.dao@discoveryloft/com | tu    | dao   |
        Then I can login successfully
            | userName    | passWord |
            | TestAlrUser | 123456   |
