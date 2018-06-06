/* 
 * cuneiform-syntax-highlight
 *
 * Copyright 2018 Jörgen Brandt
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http: *www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 'use babel';

import LanguageCuneiform from '../lib/language-cuneiform';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('LanguageCuneiform', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('language-cuneiform');
  });

  describe('when the language-cuneiform:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.language-cuneiform')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'language-cuneiform:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.language-cuneiform')).toExist();

        let languageCuneiformElement = workspaceElement.querySelector('.language-cuneiform');
        expect(languageCuneiformElement).toExist();

        let languageCuneiformPanel = atom.workspace.panelForItem(languageCuneiformElement);
        expect(languageCuneiformPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'language-cuneiform:toggle');
        expect(languageCuneiformPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.language-cuneiform')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'language-cuneiform:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let languageCuneiformElement = workspaceElement.querySelector('.language-cuneiform');
        expect(languageCuneiformElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'language-cuneiform:toggle');
        expect(languageCuneiformElement).not.toBeVisible();
      });
    });
  });
});
