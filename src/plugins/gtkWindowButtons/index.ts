/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import managedStyle from "./styles.css?managed";
import { definePluginSettings } from "@api/Settings";

export const settings = definePluginSettings({
    style: {
        type: OptionType.STRING,
        description: "Which style of buttons to use.",
        default: "adwaita",
    }
})

export default definePlugin({
    name: "GtkWindowButtons",
    description: "Add Adwaita style titlebar buttons to make Discord fit in better when using Gnome. Disable window frame to remove duplicate titlebar.",
    authors: [Devs.LucaSchlecker],
    managedStyle,
    settings,
    patches: [
        {
            find: ".wordmarkWindows",
            replacement: [
                {
                    // TODO: Fix eslint rule
                    // eslint-disable-next-line no-useless-escape
                    match: /case \i\.\i\.WINDOWS:/,
                    replace: 'case "WEB":'
                }
            ]
        },
        {
            find: ".systemBar,",
            replacement: [
                {
                    // TODO: Fix eslint rule
                    // eslint-disable-next-line no-useless-escape
                    match: /\i===\i\.PlatformTypes\.WINDOWS/g,
                    replace: "true"
                },
                {
                    // TODO: Fix eslint rule
                    // eslint-disable-next-line no-useless-escape
                    match: /\i===\i\.PlatformTypes\.WEB/g,
                    replace: "false"
                }
            ]
        },
    ],

    start() {
        document.body.classList.add(`gtk-${settings.store.style}`)
    }
});
