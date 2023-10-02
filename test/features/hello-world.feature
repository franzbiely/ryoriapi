Feature: About la lang...

  Scenario: Mu gawas ang hello world
    When Call to "/"
    Then the response status code should be "200"
    And the response should be "Hello World!"