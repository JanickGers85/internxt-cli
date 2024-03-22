import { expect } from 'chai';
import { test } from '@oclif/test';
import { ConfigService } from '../../src/services/config.service';
import { UserCredentialsFixture } from '../fixtures/login.fixture';
import { DriveRealmManager } from '../../src/services/realms/drive-realm-manager.service';

describe('Logout Command', () => {
  describe('When user is logged in and logout is called, then the current user logged out', () => {
    test
      .stdout()
      .stub(ConfigService.instance, 'readUser', (stub) => stub.resolves(UserCredentialsFixture))
      .stub(ConfigService.instance, 'clearUser', (stub) => stub.resolves())
      .stub(DriveRealmManager, 'getRealm', (stub) => stub.resolves({ write: () => ({ deleteAll: () => null }) }))
      .command(['logout'])
      .it('runs logout', (ctx) => {
        expect(ctx.stdout).to.be.equal('✓ User logged out correctly\n');
      });
  });

  describe('When user cannot be logged out, then an error is thrown', () => {
    test
      .stdout()
      .stub(ConfigService.instance, 'readUser', (stub) => stub.resolves(UserCredentialsFixture))
      .stub(ConfigService.instance, 'clearUser', (stub) => stub.rejects())
      .stub(DriveRealmManager, 'getRealm', (stub) => stub.resolves({ write: () => ({ deleteAll: () => null }) }))
      .command(['logout'])
      .exit(1)
      .it('runs logout and expects error (app exit with code 1)');
  });
});
