import requests


def test_website_health_endpoint1():
    #Testing the base endpoint
    response = requests.get('https://relevancescannerfrontend-338628837206.us-central1.run.app')
    
    #Check the status code of '/' endpoint
    assert response.status_code == 200

    #Check for the website content whether the right website is being displayed
    assert 'ATLAS Resume Relevance Scanner' in response.text
    assert 'Powered By AI' in response.text
    assert '#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7' in response.text
    assert '<!DOCTYPE html><html lang="en"><head>' in response.text


def test_website_health_endpoint2():
    #Testing the resume-upload endpoint
    response = requests.get('https://relevancescannerfrontend-338628837206.us-central1.run.app/resume-upload')
    
    #Check the status code of '/resume-upload' endpoint
    assert response.status_code == 200

    #Check for the new website content
    assert 'Upload' in response.text