#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RnBle, RCTEventEmitter)

RCT_EXTERN_METHOD(startScan)
RCT_EXTERN_METHOD(stopScan)

@end