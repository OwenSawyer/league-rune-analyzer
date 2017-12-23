# End-to-end test for phone number validation in a form
from django.core.urlresolvers import reverse
from django.test import TestCase

class FormTests(TestCase):
    def setUp(self):
        None

    def test_index(self):
        response = self.client.post('/api/', {})
        self.assertEquals(response.status_code, 200)

    def test_get_summoner(self):
        data = {
            'region': 'NA1',
            'name': 'owen3times',
        }
        response = self.client.post('/api/summoner/', data)
        self.assertEquals(response.status_code, 200)


    def test_get_matchlist(self):
        data = {
            'region': 'NA1',
            'accountId': '210164502'
        }
        response = self.client.post('/api/matchlist/', data)
        self.assertEquals(response.status_code, 200)

    def test_get_match(self):
        data = {
            'region': 'NA1',
            'matchId': '2675889004'
        }
        response = self.client.post('/api/match/', data)
        self.assertEquals(response.status_code, 200)

    def test_get_opt_runes(self):
        data = {
            'champion': 'bard',
            'role': 'support'
        }
        response = self.client.post('/api/rune/opt/', data)
        self.assertEquals(response.status_code, 200)

    # def test_get_rune_info(self):
    #     data = {
    #         'xxx' : 'xxx',
    #         'roxxxle' : 'suppxxxort'
    #     }
    #     response = self.client.post('/api/rune/info/', data)
    #     self.assertEquals(response.status_code, 200)