Feature: UATFLOW

    Scenario: Sign Up Flow
        Given I open "https://uat.paveinspect.com/"
        And I Fill information in signUp
        And I Create UserName and PassWord