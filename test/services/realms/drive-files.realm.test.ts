import sinon from 'sinon';
import { DriveFileRealmSchema, DriveFilesRealm } from '../../../src/services/realms/drive-files.realm';
import { Realm } from 'realm';
import { expect } from 'chai';
describe('Drive files realm', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });
  it('When getByRelativePath is called, should return the correct object', async () => {
    const realmMock = sandbox.createStubInstance(Realm);
    const driveFilesRealm = new DriveFilesRealm(realmMock);
    const relativePath = 'existing/path';
    // @ts-expect-error - Partial mock
    const mockFile: DriveFileRealmSchema = {
      id: 1,
      name: 'Test File',
      type: 'text',
      uuid: 'file-uuid',
      fileId: 'file-id',
      folder_id: 1,
      folder_uuid: 'folder-uuid',
      bucket: 'test-bucket',
      relative_path: relativePath,
      created_at: new Date(),
      updated_at: new Date(),
      size: 1024,
      status: 'EXISTS',
    };

    // @ts-expect-error - Partial mock
    realmMock.objects.withArgs('DriveFile').returns({ filtered: sinon.stub().returns([mockFile]) });

    const result = await driveFilesRealm.getByRelativePath(relativePath);

    expect(result).to.deep.equal(mockFile);
    realmMock.close();
  });
});
