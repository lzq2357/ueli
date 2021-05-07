import * as ini from "ini";
import * as path from "path";
import { open } from "sqlite";
import { Database } from "sqlite3";
import { FileHelpers } from "../../../common/helpers/file-helpers";
import { Icon } from "../../../common/icon/icon";
import { IconType } from "../../../common/icon/icon-type";
import { Browser } from "./browser";
import { BrowserBookmark } from "./browser-bookmark";
import { BrowserBookmarkRepository } from "./browser-bookmark-repository";

export class FirefoxBookmarkRepository implements BrowserBookmarkRepository {
    public browser = Browser.Firefox;
    public defaultIcon: Icon = {
        parameter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="a" x1="87.25%" y1="15.5%" x2="9.4%" y2="93.1%"><stop offset=".05" stop-color="#fff44f"/><stop offset=".37" stop-color="#ff980e"/><stop offset=".53" stop-color="#ff3647"/><stop offset=".7" stop-color="#e31587"/></linearGradient>    <radialGradient id="b" cx="87.4%" cy="-12.9%" r="128%" gradientTransform="translate(0.874,0),scale(0.8,1),translate(-0.87,0.129)"><stop offset=".13" stop-color="#ffbd4f"/><stop offset=".28" stop-color="#ff980e"/><stop offset=".47" stop-color="#ff3750"/><stop offset=".78" stop-color="#eb0878"/><stop offset=".86" stop-color="#e50080"/></radialGradient><radialGradient id="c" cx="49%" cy="40%" r="128%" gradientTransform="translate(0.49,0.4),scale(0.82,1),translate(-0.49,-0.4)"><stop offset=".3" stop-color="#960e18"/><stop offset=".35" stop-color="#b11927" stop-opacity=".74"/><stop offset=".43" stop-color="#db293d" stop-opacity=".34"/><stop offset=".5" stop-color="#f5334b" stop-opacity=".09"/><stop offset=".53" stop-color="#ff3750" stop-opacity="0"/></radialGradient><radialGradient id="d" cx="48%" cy="-12%" r="140%"><stop offset=".13" stop-color="#fff44f"/><stop offset=".53" stop-color="#ff980e"/></radialGradient><radialGradient id="e" cx="22.76%" cy="110.11%" r="100%"><stop offset=".35" stop-color="#3a8ee6"/><stop offset=".67" stop-color="#9059ff"/><stop offset="1" stop-color="#c139e6"/></radialGradient><radialGradient id="f" cx="52%" cy="33%" r="59%" gradientTransform="scale(.9,1)"><stop offset=".21" stop-color="#9059ff" stop-opacity="0"/><stop offset=".97" stop-color="#6e008b" stop-opacity=".6"/></radialGradient><radialGradient id="g" cx="210%" cy="-100%" r="290%"><stop offset=".1" stop-color="#ffe226"/><stop offset=".79" stop-color="#ff7139"/></radialGradient><radialGradient id="h" cx="84%" cy="-41%" r="180%"><stop offset=".11" stop-color="#fff44f"/><stop offset=".46" stop-color="#ff980e"/><stop offset=".72" stop-color="#ff3647"/><stop offset=".9" stop-color="#e31587"/></radialGradient><radialGradient id="i" cx="16.1%" cy="-18.6%" r="348.8%" gradientTransform="translate(0.16,-0.19),scale(1,0.47),rotate(84),translate(-0.16,0.19)"><stop offset="0" stop-color="#fff44f"/><stop offset=".3" stop-color="#ff980e"/><stop offset=".57" stop-color="#ff3647"/><stop offset=".74" stop-color="#e31587"/></radialGradient><radialGradient id="j" cx="18.9%" cy="-42.5%" r="238.4%"><stop offset=".14" stop-color="#fff44f"/><stop offset=".48" stop-color="#ff980e"/><stop offset=".66" stop-color="#ff3647"/><stop offset=".9" stop-color="#e31587"/></radialGradient><radialGradient id="k" cx="159.3%" cy="-44.72%" r="313.1%"><stop offset=".09" stop-color="#fff44f"/><stop offset=".63" stop-color="#ff980e"/></radialGradient><linearGradient id="l" x1="80%" y1="14%" x2="18%" y2="84%"><stop offset=".17" stop-color="#fff44f" stop-opacity=".8"/><stop offset=".6" stop-color="#fff44f" stop-opacity="0"/></linearGradient></defs><path id="shape-base" d="M478.711 166.353c-10.445-25.124-31.6-52.248-48.212-60.821 13.52 26.505 21.345 53.093 24.335 72.936 0 0.039 0.015 0.136 0.047 0.4C427.706 111.135 381.627 83.823 344 24.355c-1.9-3.007-3.805-6.022-5.661-9.2a73.716 73.716 0 0 1-2.646-4.972 43.7 43.7 0 0 1-3.593-9.506 0.626 0.626 0 0 0-0.546-0.644 0.818 0.818 0 0 0-0.451 0c-0.034 0.012-0.084 0.051-0.12 0.065-0.053 0.021-0.12 0.069-0.176 0.1 0.027-0.036 0.083-0.117 0.1-0.136-60.37 35.356-80.85 100.761-82.732 133.484a120.249 120.249 0 0 0-66.142 25.488 71.355 71.355 0 0 0-6.225-4.7 111.338 111.338 0 0 1-0.674-58.732c-24.688 11.241-43.89 29.01-57.85 44.7h-0.111c-9.527-12.067-8.855-51.873-8.312-60.184-0.114-0.515-7.107 3.63-8.023 4.255a175.073 175.073 0 0 0-23.486 20.12 210.478 210.478 0 0 0-22.442 26.913c0 0.012-0.007 0.026-0.011 0.038 0-0.013 0.007-0.026 0.011-0.038a202.838 202.838 0 0 0-32.247 72.805c-0.115 0.521-0.212 1.061-0.324 1.586-0.452 2.116-2.08 12.7-2.365 15-0.022 0.177-0.032 0.347-0.053 0.524a229.066 229.066 0 0 0-3.9 33.157c0 0.41-0.025 0.816-0.025 1.227C16 388.418 123.6 496 256.324 496c118.865 0 217.56-86.288 236.882-199.63 0.407-3.076 0.733-6.168 1.092-9.271 4.777-41.21-0.53-84.525-15.587-120.746zM201.716 354.447c1.124 0.537 2.18 1.124 3.334 1.639 0.048 0.033 0.114 0.07 0.163 0.1a126.191 126.191 0 0 1-3.497-1.739zm55.053-144.93zm198.131-30.59l-0.032-0.233c0.012 0.085 0.027 0.174 0.04 0.259z" fill="url(#a)"/><path id="body-outer-ring" d="M478.711 166.353c-10.445-25.124-31.6-52.248-48.212-60.821 13.52 26.505 21.345 53.093 24.335 72.936 0-0.058 0.011 0.048 0.036 0.226 0.012 0.085 0.027 0.174 0.04 0.259 22.675 61.47 10.322 123.978-7.479 162.175-27.539 59.1-94.215 119.67-198.576 116.716C136.1 454.651 36.766 370.988 18.223 261.41c-3.379-17.28 0-26.054 1.7-40.084-2.071 10.816-2.86 13.94-3.9 33.157 0 0.41-0.025 0.816-0.025 1.227C16 388.418 123.6 496 256.324 496c118.865 0 217.56-86.288 236.882-199.63 0.407-3.076 0.733-6.168 1.092-9.271 4.777-41.21-0.53-84.525-15.587-120.746z" fill="url(#b)"/><path id="body-outer-ring-shadow" d="M478.711 166.353c-10.445-25.124-31.6-52.248-48.212-60.821 13.52 26.505 21.345 53.093 24.335 72.936 0-0.058 0.011 0.048 0.036 0.226 0.012 0.085 0.027 0.174 0.04 0.259 22.675 61.47 10.322 123.978-7.479 162.175-27.539 59.1-94.215 119.67-198.576 116.716C136.1 454.651 36.766 370.988 18.223 261.41c-3.379-17.28 0-26.054 1.7-40.084-2.071 10.816-2.86 13.94-3.9 33.157 0 0.41-0.025 0.816-0.025 1.227C16 388.418 123.6 496 256.324 496c118.865 0 217.56-86.288 236.882-199.63 0.407-3.076 0.733-6.168 1.092-9.271 4.777-41.21-0.53-84.525-15.587-120.746z" fill="url(#c)"/><path id="tail-tip" d="M361.922 194.6c0.524 0.368 1 0.734 1.493 1.1a130.706 130.706 0 0 0-22.31-29.112C266.4 91.892 321.516 4.626 330.811 0.194c0.027-0.036 0.083-0.117 0.1-0.136-60.37 35.356-80.85 100.761-82.732 133.484 2.8-0.194 5.592-0.429 8.442-0.429 45.051 0 84.289 24.77 105.301 61.487z" fill="url(#d)"/><path id="globe-base" d="M256.772 209.514c-0.393 5.978-21.514 26.593-28.9 26.593-68.339 0-79.432 41.335-79.432 41.335 3.027 34.81 27.261 63.475 56.611 78.643 1.339 0.692 2.694 1.317 4.05 1.935a132.768 132.768 0 0 0 7.059 2.886 106.743 106.743 0 0 0 31.271 6.031c119.78 5.618 142.986-143.194 56.545-186.408 22.137-3.85 45.115 5.053 57.947 14.067-21.012-36.714-60.25-61.484-105.3-61.484-2.85 0-5.641 0.235-8.442 0.429a120.249 120.249 0 0 0-66.142 25.488c3.664 3.1 7.8 7.244 16.514 15.828 16.302 16.067 58.13 32.705 58.219 34.657z" fill="url(#e)"/><path id="globe-shadow" d="M256.772 209.514c-0.393 5.978-21.514 26.593-28.9 26.593-68.339 0-79.432 41.335-79.432 41.335 3.027 34.81 27.261 63.475 56.611 78.643 1.339 0.692 2.694 1.317 4.05 1.935a132.768 132.768 0 0 0 7.059 2.886 106.743 106.743 0 0 0 31.271 6.031c119.78 5.618 142.986-143.194 56.545-186.408 22.137-3.85 45.115 5.053 57.947 14.067-21.012-36.714-60.25-61.484-105.3-61.484-2.85 0-5.641 0.235-8.442 0.429a120.249 120.249 0 0 0-66.142 25.488c3.664 3.1 7.8 7.244 16.514 15.828 16.302 16.067 58.13 32.705 58.219 34.657z" fill="url(#f)"/><path id="ear" d="M170.829 151.036a244.042 244.042 0 0 1 4.981 3.3 111.338 111.338 0 0 1-0.674-58.732c-24.688 11.241-43.89 29.01-57.85 44.7 1.155-0.033 36.014-0.66 53.543 10.732z" fill="url(#g)"/><path id="body" d="M18.223 261.41C36.766 370.988 136.1 454.651 248.855 457.844c104.361 2.954 171.037-57.62 198.576-116.716 17.8-38.2 30.154-100.7 7.479-162.175l-0.008-0.026-0.032-0.233c-0.025-0.178-0.04-0.284-0.036-0.226 0 0.039 0.015 0.136 0.047 0.4 8.524 55.661-19.79 109.584-64.051 146.044l-0.133 0.313c-86.245 70.223-168.774 42.368-185.484 30.966a144.108 144.108 0 0 1-3.5-1.743c-50.282-24.029-71.054-69.838-66.6-109.124-42.457 0-56.934-35.809-56.934-35.809s38.119-27.179 88.358-3.541c46.53 21.893 90.228 3.543 90.233 3.541-0.089-1.952-41.917-18.59-58.223-34.656-8.713-8.584-12.85-12.723-16.514-15.828a71.355 71.355 0 0 0-6.225-4.7 282.929 282.929 0 0 0-4.981-3.3c-17.528-11.392-52.388-10.765-53.543-10.735h-0.111c-9.527-12.067-8.855-51.873-8.312-60.184-0.114-0.515-7.107 3.63-8.023 4.255a175.073 175.073 0 0 0-23.486 20.12 210.478 210.478 0 0 0-22.442 26.919c0 0.012-0.007 0.026-0.011 0.038 0-0.013 0.007-0.026 0.011-0.038a202.838 202.838 0 0 0-32.247 72.805c-0.115 0.521-8.65 37.842-4.44 57.199z" fill="url(#h)"/><path id="tail-flame" d="M341.105 166.587a130.706 130.706 0 0 1 22.31 29.112c1.323 0.994 2.559 1.985 3.608 2.952 54.482 50.2 25.936 121.2 23.807 126.26 44.261-36.46 72.575-90.383 64.051-146.044C427.706 111.135 381.627 83.823 344 24.355c-1.9-3.007-3.805-6.022-5.661-9.2a73.716 73.716 0 0 1-2.646-4.972 43.7 43.7 0 0 1-3.593-9.506 0.626 0.626 0 0 0-0.546-0.644 0.818 0.818 0 0 0-0.451 0c-0.034 0.012-0.084 0.051-0.12 0.065-0.053 0.021-0.12 0.069-0.176 0.1-9.291 4.428-64.407 91.694 10.298 166.389z" fill="url(#i)"/><path id="tail-small" d="M367.023 198.651c-1.049-0.967-2.285-1.958-3.608-2.952-0.489-0.368-0.969-0.734-1.493-1.1-12.832-9.014-35.81-17.917-57.947-14.067 86.441 43.214 63.235 192.026-56.545 186.408a106.743 106.743 0 0 1-31.271-6.031 134.51 134.51 0 0 1-7.059-2.886c-1.356-0.618-2.711-1.243-4.05-1.935 0.048 0.033 0.114 0.07 0.163 0.1 16.71 11.4 99.239 39.257 185.484-30.966l0.133-0.313c2.129-5.054 30.675-76.057-23.807-126.258z" fill="url(#j)"/><path id="cheek-tufts" d="M148.439 277.443s11.093-41.335 79.432-41.335c7.388 0 28.509-20.615 28.9-26.593s-43.7 18.352-90.233-3.541c-50.239-23.638-88.358 3.541-88.358 3.541s14.477 35.809 56.934 35.809c-4.453 39.286 16.319 85.1 66.6 109.124 1.124 0.537 2.18 1.124 3.334 1.639-29.348-15.169-53.582-43.834-56.609-78.644z" fill="url(#k)"/><path id="overlay-yellow" d="M478.711 166.353c-10.445-25.124-31.6-52.248-48.212-60.821 13.52 26.505 21.345 53.093 24.335 72.936 0 0.039 0.015 0.136 0.047 0.4C427.706 111.135 381.627 83.823 344 24.355c-1.9-3.007-3.805-6.022-5.661-9.2a73.716 73.716 0 0 1-2.646-4.972 43.7 43.7 0 0 1-3.593-9.506 0.626 0.626 0 0 0-0.546-0.644 0.818 0.818 0 0 0-0.451 0c-0.034 0.012-0.084 0.051-0.12 0.065-0.053 0.021-0.12 0.069-0.176 0.1 0.027-0.036 0.083-0.117 0.1-0.136-60.37 35.356-80.85 100.761-82.732 133.484 2.8-0.194 5.592-0.429 8.442-0.429 45.053 0 84.291 24.77 105.3 61.484-12.832-9.014-35.81-17.917-57.947-14.067 86.441 43.214 63.235 192.026-56.545 186.408a106.743 106.743 0 0 1-31.271-6.031 134.51 134.51 0 0 1-7.059-2.886c-1.356-0.618-2.711-1.243-4.05-1.935 0.048 0.033 0.114 0.07 0.163 0.1a144.108 144.108 0 0 1-3.5-1.743c1.124 0.537 2.18 1.124 3.334 1.639-29.35-15.168-53.584-43.833-56.611-78.643 0 0 11.093-41.335 79.432-41.335 7.388 0 28.509-20.615 28.9-26.593-0.089-1.952-41.917-18.59-58.223-34.656-8.713-8.584-12.85-12.723-16.514-15.828a71.355 71.355 0 0 0-6.225-4.7 111.338 111.338 0 0 1-0.674-58.732c-24.688 11.241-43.89 29.01-57.85 44.7h-0.111c-9.527-12.067-8.855-51.873-8.312-60.184-0.114-0.515-7.107 3.63-8.023 4.255a175.073 175.073 0 0 0-23.486 20.12 210.478 210.478 0 0 0-22.435 26.916c0 0.012-0.007 0.026-0.011 0.038 0-0.013 0.007-0.026 0.011-0.038a202.838 202.838 0 0 0-32.247 72.805c-0.115 0.521-0.212 1.061-0.324 1.586-0.452 2.116-2.486 12.853-2.77 15.156-0.022 0.177 0.021-0.176 0 0a279.565 279.565 0 0 0-3.544 33.53c0 0.41-0.025 0.816-0.025 1.227C16 388.418 123.6 496 256.324 496c118.865 0 217.56-86.288 236.882-199.63 0.407-3.076 0.733-6.168 1.092-9.271 4.777-41.21-0.53-84.525-15.587-120.746zm-23.841 12.341c0.012 0.085 0.027 0.174 0.04 0.259l-0.008-0.026-0.032-0.233z" fill="url(#l)"/></svg>`,
        type: IconType.SVG
    };

    constructor(private readonly userDataFolderPath: string) {}

    public getBrowserBookmarks(): Promise<BrowserBookmark[]> {
        return this.getDatabaseFilePath()
            .then(dbFilePath => this.getBookmarks(dbFilePath));
    }

    private getDatabaseFilePath(): Promise<string> {
        const profilesIniFilePath = `${this.userDataFolderPath}${path.sep}profiles.ini`;
        return new Promise((resolve, reject) => FileHelpers.readFile(profilesIniFilePath)
            .then(fileContent => {
                const profilesIni = ini.parse(fileContent);
                const profilePath = this.getAbsoluteProfilePath(profilesIni);
                if (profilePath) {
                    resolve(`${profilePath}${path.sep}places.sqlite`);
                } else {
                    reject('Profile not found');
                }
            })
        );
    }

    private getAbsoluteProfilePath(profilesIni: { [key: string]: any }): string | undefined {
        const profiles: { Default: string, Path: string, IsRelative: string }[] = Object.keys(profilesIni)
            .filter(iniSection => iniSection.startsWith('Profile'))
            .map(iniSection => profilesIni[iniSection]);

        let profile: { Default: string, Path: string, IsRelative: string } | undefined;
        const installSectionName = Object.keys(profilesIni).find(s => s.startsWith('Install'));
        if (installSectionName && profilesIni[installSectionName]?.Default) {
            profile = profiles.find(p => p.Path === profilesIni[installSectionName]?.Default);
        }
        if (!profile) {
            profile = profiles.find(p => p.Default === '1');
        }
        if (!profile) {
            profile = profiles.find(p => p.Path);
        }
        if (!profile?.Path) {
            return undefined;
        }
        return profile.IsRelative
            ? `${this.userDataFolderPath}${path.sep}${profile.Path.replaceAll('/', path.sep)}`
            : profile.Path;
    }

    private getBookmarks(databaseFilePath: string): Promise<BrowserBookmark[]> {
        return open({filename: databaseFilePath, driver: Database})
            .then(db => db.all('SELECT b.title, p.url FROM moz_bookmarks b JOIN moz_places p ON b.fk = p.id WHERE b.type = 1'))
            .then(bookmarks => bookmarks.map(b => ({
                name: b.title,
                url: b.url,
                name_pinyin:"",
                name_pinyin_first_letter:""
            })));
    }
}
