
@import UIKit;

#import "LocalNotificationManager.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation LocalNotificationManager

@synthesize bridge = _bridge;

- (id) init
{
  self = [super init];
  if (!self) return nil;
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(receiveLocalNotification:)
                                               name:@"LocalNotification"
                                             object:nil];
  
  return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(checkPermissions)
{
  NSLog(@"checkPermissions");
    [[UIApplication sharedApplication] registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge) categories:nil]];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
}

RCT_EXPORT_METHOD(cancelNotifications)
{
  [[UIApplication sharedApplication] cancelAllLocalNotifications];
}

RCT_EXPORT_METHOD(scheduleNotification:(NSString *)text interval:(NSInteger)interval)
{
  UILocalNotification *notification = [[UILocalNotification alloc] init];
  
  notification.fireDate = [NSDate dateWithTimeIntervalSinceNow: interval];
  
  notification.alertBody = text;
  
//  notification.soundName = UILocalNotificationDefaultSoundName;
  
  [[UIApplication sharedApplication] scheduleLocalNotification: notification];
  
  NSLog(@"Notification should be presented: %@", text);
}

- (void) receiveLocalNotification:(NSNotification *) notification
{
  if ([[notification name] isEqualToString:@"LocalNotification"])
    NSLog (@"Successfully received the notification!");
  
  UILocalNotification *localNotification = notification.object;
  
  [self.bridge.eventDispatcher sendAppEventWithName:@"didReceiveNotification"
                                               body:@{@"notification": localNotification.alertBody}];
}


@end
