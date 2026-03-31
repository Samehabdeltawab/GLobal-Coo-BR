import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { expect } from '@playwright/test';

export async function handleDownloadAndSave(page, triggerDownloadCallback) {
    const downloadPath = join(__dirname, '..', 'downloads');
    mkdirSync(downloadPath, { recursive: true });

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        triggerDownloadCallback() // زر أو إجراء التحميل
    ]);

    const fileName = await download.suggestedFilename();
    const filePath = join(downloadPath, fileName);

    await download.saveAs(filePath);

    // ✅ تحقق من اسم الملف
    const certificateFileRegex = /^C-\d{2}-\d{8}\.pdf$/;
    expect(certificateFileRegex.test(fileName)).toBeTruthy();

    // ✅ تحقق من وجود الملف
    expect(existsSync(filePath)).toBeTruthy();

    return filePath;
}

export default { handleDownloadAndSave };
