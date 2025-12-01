# Notifications

instantOS has a notification center similar to android. Notifications will
appear in a bubble at the top left of the screen, stay there for a while and
then automatically disappear. They can also be closed by right clicking on
them.

Application defined context actions like confirmation prompts or just shortcuts
to where the notification comes from are available by left clicking on the
bubble.

## Notification center

All past notifications are accessible and can be managed in the
notification center. The notification center is started with ++super+g++ and
can be closed with escape or right clicking on it.

Notifications can be read from the notification center by left clicking on
them. This opens up the notification menu where the content can be read or managed.

## Deleting notifications

Notifications can either be deleted individually by selecting them and choosing
the delete option or by pressing ++shift+"left/right"++ in the
notification center where you can delete notifications that contain a certain
keyword, come from a specific application or you van just clear all of them.

## Paging

Notifications are persistent between reboots unless specifically removed. This
means that over a long period of usage the list can get quite long. In order to
keep good performance the notification center only displays up to 700
notifications at a time. If the total number of notifications exceeds 700 then
notifications will be divided into pages with 700 notifications each. At the
bottom of each page (which can be reachoed by scrolling down) is a next button
to load and view the next page.
